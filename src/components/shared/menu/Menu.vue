<template>
<header class="navbar">
    <section class="navbar-section">
        <router-link :to="{ name: 'Home'}" class="navbar-brand mr-2">
            <img src="../../../assets/img/projeto.png" alt="Ant Project" class="logo-nav-bar">
        </router-link>
        <router-link :to="{ name: 'Sobre' }" v-show="!logado">
            Sobre o projeto
        </router-link>
        <router-link :to="{ name: 'CadastraOpiniao' }" class="btn btn-success btn-sm" v-show="logado">
            <i class="icon icon-plus"></i> Nova opinião
        </router-link>
    </section>
    <section class="navbar-section">
        <router-link class="btn btn-primary mr-2" :to="{ name: 'Login' }" v-show="!logado" >
            <i class="icon icon-shutdown"></i> Entre ou cadastre-se 
        </router-link>
        <div class="dropdown" v-show="logado">
            <a href="#" class="btn btn-primary mr-2 dropdown-toggle" tabindex="0">
                <i class="icon icon-menu"></i>
            </a>    
            <ul class="menu">
                <li>
                    <router-link :to="{ name: 'Perfil' }">
                        Meus dados
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Opnioes' }">
                        Minhas opiniões
                    </router-link>
                </li>
                <li>
                    <button class="btn btn-link" @click="logout()"><i class="icon icon-shutdown"></i> Sair</button>
                </li>
            </ul>
        </div>
    </section>
</header>
</template>

<script>
import Router from '../../../router/index.js';
import { auth } from "@/firebase";
export default {

    data() {
        return {
            logado: false
        }
    },
    mounted()  {
        this.verificaLogado();
    },
    methods: {
        verificaLogado() {
            let sessao = '';
            sessao = localStorage.getItem('antuser');
            this.logado = sessao !== null && sessao.length > 0;
        },
        logout() {
            auth.signOut();
            this.$router.push('/')
        }
    },
    watch: {
        '$route' (to, from) {
            this.verificaLogado();
        }
    }

}
</script>

<style>

</style>
