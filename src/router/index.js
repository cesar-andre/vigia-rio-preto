import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Cadastro from '@/views/Cadastro'
import Users from '@/views/users/Index'
import UserDetails from '@/views/users/Details'
import Home from '@/views/Home'

import Sobre from '@/views/Sobre';
import Opnioes from '@/views/Opnioes';
import Perfil from '@/views/Perfil';
import CadastraOpiniao from '@/views/CadastraOpiniao';
import Seed from '@/components/Seed';

Vue.use(Router)

function checkAuthentication(to, from, next){
  if(localStorage.getItem('antuser')) {
    next();
  } else{
    next('/login');
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: Cadastro
    },
    {
      path: '/sobre',
      name: 'Sobre',
      component: Sobre
    },
    {
      path: '/opinioes',
      name: 'Opnioes',
      component: Opnioes,
      beforeEnter: checkAuthentication
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil,
      beforeEnter: checkAuthentication
    },
    {
      path: '/cadastra-opiniao',
      name: 'CadastraOpiniao',
      component: CadastraOpiniao,
      beforeEnter: checkAuthentication
    },
    {
      path: '/edita-opiniao/:id',
      name: 'EditaOpiniao',
      component: CadastraOpiniao,
      beforeEnter: checkAuthentication
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      beforeEnter: checkAuthentication
    },
    {
      path: '/users/:id/details',
      name: 'UserDetails',
      component: UserDetails,
      beforeEnter: checkAuthentication
    }
        
  ],
  mode: 'history'
})
