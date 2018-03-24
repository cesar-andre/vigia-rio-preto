<template>
  <div>
      <menu-navegacao />
      <br>
    <div class="container">
        <div class="columns">
            <div class="column col-6 centered">
                <div class="col-12">
                    <h3 class="">Cadastrar opnião</h3>                    
                </div>
                <div class="col-12">
                    <div class="form-group" v-bind:class="{ 'has-error': $v.opniao.street.$error }">
                        <label for="rua" class="form-label">Rua *</label>
                        <span class="form-input-hint">Procure o nome da rua abaixo e selecione entre os resultados. Pesquise sem o tipo de logradouro (Rua, Avenida e etc.)</span>
                        <input v-debounce="delay" v-model.lazy="sample" class="form-input input-lg" placeholder="Pesquise aqui..." @change="popularRuas()" /><br>
                        <select v-model="opniao.street" name="rua" id="rua" class="form-select" @click="$v.opniao.street.$touch()">
                            <option value="">Selecione aqui...</option>
                            <option v-for="rua in ruas" :value="rua.tipo_logradouro + ' ' + rua.logradouro"> {{ rua.tipo_logradouro }} {{ rua.logradouro }}  {{ rua.complemento }}</option>
                        </select>
                        <span class="form-input-hint" v-if="$v.opniao.street.$error">Rua é obrigatória</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': $v.opniao.classification.$error }">
                        <label for="classificacao" class="form-label">Classificação geral *</label>
                        <select v-model="opniao.classification" name="classificacao" id="classificacao" class="form-select" @click="$v.opniao.classification.$touch()">
                            <option value="">Escolha uma opção...</option>
                            <option v-for="classificacao in classificacoes" :value="classificacao.name"> {{ classificacao.name }} </option>
                        </select>
                        <span class="form-input-hint" v-if="$v.opniao.classification.$error">Classificação é obrigatória</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': $v.opniao.period.$error }">
                        <label for="periodo" class="form-label">Periodo de atenção *</label>
                        <select v-model="opniao.period" name="periodo" id="periodo" class="form-select" @click="$v.opniao.period.$touch()">
                            <option value="">Escolha uma opção...</option>
                            <option v-for="periodo in periodos" :value="periodo.name"> {{ periodo.name }} </option>
                        </select>
                        <span class="form-input-hint" v-if="$v.opniao.period.$error">Período é obrigatório</span>
                    </div>
                    <div class="form-group">
                        <router-link class="btn btn-error" :to="{ name: 'Opnioes' }" >
                            Voltar
                        </router-link>
                        <button class="btn btn-success" @click="cadastrar()">Cadastrar</button>
                    </div>                
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { classifications, periods, streets, opinions, rankings } from '@/firebase';
import Menu from '../components/shared/menu/Menu.vue';
import { required } from 'vuelidate/lib/validators';
import debounce from '@/debounce';

export default {
    components: {
        'menu-navegacao': Menu
    },
    data() {
        return {
            classificacoes: [],
            periodos: [],
            ruas: [],
            opniao: {
                street: "",
                classification: "",
                period: "",
                user: "" 
            },
            ranking: {},
            sample: '',
            delay: 500
        }
    },
    directives: {debounce},
    created() {

        let sessao = JSON.parse(localStorage.getItem('antuser'));
        this.opniao.user = sessao.uid;

        if(this.$route.params.id) {
            opinions.find(this.$route.params.id).then(opiniaoEncontrada => {
                this.opniao = opiniaoEncontrada.data();
                this.opniao.id = this.$route.params.id;
            });
        }

        classifications.all().then(snapshot => {
            snapshot.forEach(classification => {
                let classificacao = classification.data();
                classificacao.id = classification.id;
                this.classificacoes.push(classificacao);
            });
        });

        periods.all().then(snapshot => {
            snapshot.forEach(period => {
                let periodo = period.data();
                periodo.id = period.id;
                this.periodos.push(periodo);
            });
        });
       /* streets.all().then(snapshot => {
            snapshot.forEach(street => {
                let rua = street.data();
                rua.id = street.id;
                this.ruas.push(rua);
            });
        });*/
    },
    methods: {
        cadastrar() {

            if(!this.$v.$invalid) {

                if(this.$route.params.id) {
                    opinions.edit(this.opniao.id, this.opniao);
                } else {
                    opinions.create(this.opniao);
                }

                rankings.findByStreet(this.opniao.street).then(snapshot => {

                    if(snapshot.empty){

                        let newRanking = {
                            street: this.opniao.street,
                            value: this.resolverClassificacao(this.opniao.classification)
                        }

                        rankings.create(newRanking);

                    } else{
                        snapshot.forEach(ranking => {
                            let rank = ranking.data();
                            rank.id = ranking.id;

                            let newBias = rank.value + this.resolverClassificacao(this.opniao.classification);
                            console.log(newBias);
                            rank.value = newBias;

                            console.log(rank);
                            rankings.edit(rank.id, rank);
                        });
                    }
                    
                });

                this.$notify({
                    group: 'flash',
                    title: 'Sucesso!',
                    text: 'Opnião cadastrada com sucesso!',
                    type: 'success'
                });

            } else{
                this.$v.$touch();
            }
        },
        resolverClassificacao(classificacao) {
            let bias = 0;
            switch (classificacao) {
                case 'Perigoso':
                    bias = -1;
                    break;
                case 'Seguro':
                    bias = 1;
                    break;
            }

            return bias;
        },
        popularRuas() {
            this.ruas = [];
            streets.findByStreetName(this.sample).then(snapshot => {

                console.log(snapshot);

                snapshot.forEach(street => {
                    let rua = street.data();
                    rua.id = street.id;
                    this.ruas.push(rua);
                });
            });
        }
    },
    validations: {
        opniao: {
            street: {
                required
            },
            classification: {
                required
            },
            period: {
                required
            }
        }
    }

}
</script>

<style>

</style>
