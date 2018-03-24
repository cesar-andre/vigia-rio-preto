<template>
    <div>
        <menu-navegacao />
    <br>
    <div class="container sobre">
        <div class="columns">
            <div class="column col-11 centered">
                <div class="col-12">
                    <h3>Minhas opiniões</h3>
                </div>
                <div class="col-12">
                    <div class="has-icon-left">
                        <input type="search" class="form-input" @input="q = $event.target.value" placeholder="Digite o nome da rua...">
                        <i class="form-icon icon icon-search"></i>
                    </div>
                </div>
                <br>
                <div class="col-12">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Rua</th>
                                <th>Classificação geral</th>
                                <th>Periodo de atenção</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="opniao in opnioesComFiltro">
                                <th> {{ opniao.street }} </th>
                                <th> {{ opniao.classification }} </th>
                                <th> {{ opniao.period }} </th>
                                <th>
                                    <router-link :to="{name: 'EditaOpiniao', params: {id: opniao.id}}"> 
                                        <button class="btn btn-primary"><i class="icon icon-edit"></i></button>
                                    </router-link>
                                    <button class="btn btn-error" @click="deletarOpniao(opniao)"><i class="icon icon-delete"></i></button>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
    </div>
</template>

<script>
import { opinions, rankings } from '@/firebase';
import Menu from '../components/shared/menu/Menu.vue';
export default {
    components: {
        'menu-navegacao': Menu
    },
    data() {
        return {
            opinioes: [],
            q: ""
        }
    },
    created() {
        let sessao = JSON.parse(localStorage.getItem('antuser'));
        opinions.findByUser(sessao.uid).then(snapshot => {
            snapshot.forEach(opinion => {
                let opiniao = opinion.data();
                opiniao.id = opinion.id;
                this.opinioes.push(opiniao);
            });
        });
    },
    computed: {
        opnioesComFiltro() {
            if(this.q) {
                let exp = new RegExp(this.q.trim(), 'i');
                return this.opinioes.filter(opiniao => exp.test(opiniao.street))
            } else{
                return this.opinioes;
            }
        }
    },
    methods: {
        deletarOpniao(opiniao) {
            this.$swal({
                title: 'Tem certeza da exclusão?',
                text: "Você não poderá reverter essa ação",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK, pode deletar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {

                    rankings.findByStreet(opiniao.street).then(snapshot => {
                        snapshot.forEach(ranking => {
                            let rank = ranking.data();
                            rank.id = ranking.id;
                            let newBias = rank.value;

                            if(opiniao.classification == 'Perigoso'){
                                newBias += 1;
                            }

                            if(opiniao.classification == 'Seguro'){
                                newBias -= 1;
                            }

                            rank.value = newBias;
                            rankings.edit(rank.id, rank);
                        });
                    
                    });


                    let index = this.opinioes.indexOf(opiniao);
                    this.opinioes.splice(index, 1);
                    opinions.del(opiniao.id).then(function() {});

                    
                }
            });
        }
    }

}
</script>

<style>

</style>
