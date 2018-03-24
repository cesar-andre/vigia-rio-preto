<template>
    <div  class="container">
      <div class="columns">
        <div id="login-box" class="column col-4 centered">
          <h4>Novo usuário</h4>
          <div class="toast toast-error" v-if="authErrorCode == 'auth/email-already-in-use' ">
              Esse e-mail já possui cadastro
            </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.usuario.nome.$error }">
              <label class="form-label" for="nome">Nome *</label>
              <input class="form-input" type="text" id="nome" v-model="usuario.nome" placeholder="Nome" @blur="$v.usuario.nome.$touch()">
              <span class="form-input-hint" v-if="$v.usuario.nome.$error">Nome é obrigatório</span>
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.usuario.sobrenome.$error }">
              <label class="form-label" for="sobrenome">Sobrenome *</label>
              <input class="form-input" type="text" id="sobrenome" v-model="usuario.sobrenome" placeholder="Sobrenome" @blur="$v.usuario.sobrenome.$touch()">
              <span class="form-input-hint" v-if="$v.usuario.sobrenome.$error">Sobrenome é obrigatório</span>
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': $v.usuario.email.$error }">
              <label class="form-label" for="email">E-mail*</label>
              <input class="form-input" type="email" id="email" v-model="usuario.email" placeholder="E-mail" @blur="$v.usuario.email.$touch()">
              <span class="form-input-hint" v-if="!$v.usuario.email.required && $v.usuario.email.$error">E-mail é obrigatório</span>
              <span class="form-input-hint" v-if="!$v.usuario.email.email">E-mail fora de formatação</span>
          </div>
            <div class="form-group" v-bind:class="{ 'has-error': $v.usuario.senha.$error }">
              <label class="form-label" for="password">Senha *</label>
              <input class="form-input" type="password" id="senha" v-model="usuario.senha" placeholder="Senha" @blur="$v.usuario.senha.$touch()">
              <span class="form-input-hint" v-if="$v.usuario.senha.$error">Senha é obrigatório</span>
            </div>
            <div class="form-group">
                    <label class="form-switch">
                        <input type="checkbox" name="ehCidadao" id="ehCidadao" v-model="usuario.ehCidadao">
                        <i class="form-icon"></i> Sou morador de São José do Rio Preto
                    </label>
            </div>
            <div class="form-group">
              <router-link class="btn btn-error" :to="{ name: 'Login' }" >
                Voltar
              </router-link>
              <button class="btn btn-success" @click="signUp()">Cadastrar</button>
            </div>
        </div>
      </div>
    </div>

</template>

<script>
import { auth, users } from '@/firebase';
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  data () {
    return {
      usuario: { },
      authErrorCode: ""
    }
  },
  methods: {
    signUp() {
      if(!this.$v.$invalid) {
        this.authErrorCode = "";
        auth.signUp(this.usuario.email, this.usuario.senha).then(authUser => {
          users.create(authUser.uid, this.usuario);
        })
        .catch(error => {
          this.authErrorCode = error.code;
        });
      } else {
        this.$v.$touch();
      }
    }
  },
  validations: {
    usuario: {
      nome: {
        required
      },
      sobrenome: {
        required
      },
      email: {
        required, email
      },
      senha: {
        required
      }
    }
  }
}
</script>



      