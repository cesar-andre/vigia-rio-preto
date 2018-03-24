<template>
    <div class="login-background">
      <div  class="container">
        <div class="columns">
          <div id="login-box" class="column col-4 centered">
            <img src="../assets/img/projeto.png" alt="Ant Project" class="img-responsive centered">
            <div class="toast toast-error" v-if="authErrorCode == 'auth/user-not-found' ">
              Esse usuário não foi encontrado, verifique as credenciais
            </div>
            <div class="toast toast-error" v-if="authErrorCode == 'auth/invalid-email' ">
              E-mail inválido, verifique as credenciais
            </div>
            <div class="toast toast-error" v-if="authErrorCode == 'auth/wrong-password' ">
              Senha inválida, verifique as credenciais
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': $v.email.$error }">
              <label class="form-label" for="email">E-mail</label>
              <input class="form-input" type="text" id="email" v-model="email" placeholder="E-mail" @blur="$v.email.$touch()">
              <span class="form-input-hint" v-if="$v.email.$error">E-mail é obrigatório</span>
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': $v.password.$error }">
              <label class="form-label" for="password">Senha</label>
              <input class="form-input" type="password" id="password" v-model="password" placeholder="Senha" @blur="$v.password.$touch()">
              <span class="form-input-hint" v-if="$v.password.$error">Senha é obrigatória</span>
            </div>
            <div class="form-group">
              <!-- <router-link :to="{ name: 'Esqueceu' }" >Esqueceu sua senha?</router-link><br> -->
              <router-link :to="{ name: 'Cadastro' }" >Ainda não possuo uma conta</router-link>
              <br><br>
              <router-link class="btn btn-error" :to="{ name: 'Home'}" >
                Voltar
              </router-link>
              <button class="btn btn-success"  @click="signIn()">Login</button>
            </div>
          </div>
        </div>
    </div>
    </div>
</template>

<script>
import { auth } from "@/firebase";
import { required } from 'vuelidate/lib/validators'

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      authErrorCode: ""
    };
  },
  methods: {
    signIn() {

      if(!this.$v.$invalid) {
        auth.signIn(this.email, this.password).then(authUser => {
          this.authErrorCode = "";
          console.log("Logou");
        }).catch(error => {
          this.authErrorCode = error.code;
        });
      } else{
        this.$v.$touch();
      }      
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  }
};
</script>

<style>
</style>


      