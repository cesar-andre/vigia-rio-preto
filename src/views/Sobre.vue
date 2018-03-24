<template>
  <div>
      <menu-navegacao />
      <br>
      <div class="container sobre">
        <div class="columns">
            <div class="column col-6">
                <h3>O que é o Vigia Rio Preto?</h3>
                <p>
                    O Vigia Rio Preto é uma proposta de Aplicação Web Colaborativa para a disseminação de Informações 
                    sobre Violência Urbana no municipio de São José do Rio Preto. Trata-se de um trabalho de conclusão de curso solicitado pelo Programa de Pós Graduação da FATEC Rio Preto
                </p>
                <h3>Por que colaborar com o projeto?</h3>
                <p>
                    A violência urbana é um problema generalizado em diversos munícipios do Brasil, incluindo São José do Rio Preto. Ao compartilhar o que sabe, você pode evitar que um cidadão inocente visite áreas perigosas da cidade.
                </p>
                <h3>Como posso colaborar com o projeto?</h3>
                <p>
                    Para colaborar é simples, faça um cadastro no site (é super rápido) e cadastre suas opniões. Assim que cadastrado, sua opnião ajudará a formar o mapa da violência
                </p>
                <h3>E se eu não moro em São José do Rio Preto?</h3>
                <p>
                    Se você não mora, porém ainda conhece um pouco sobre Rio Preto, está convidado a participar também. Cadastre-se e e dê sua opnião sobre a cidade.
                </p>
            </div>
            <div class="column col-6">
                <h3>Quem está por trás do Vigia Rio Preto?</h3>
                <div class="columns">
                    <section class="column col-4">
                        <img src="../assets/img/cesar.jpg" alt="Cesar" class="img-responsive" style="width: 200px">
                    </section>
                    <section class="column col-8">
                        <br>
                        <h5>Cesar André de Paula</h5>
                        <p>Pós-graduando em Colsultoria Web pela FATEC Rio Preto</p>
                    </section>
                </div>
                <div class="divider"></div>
                <div class="columns">
                    <section class="column col-4">
                        <img src="../assets/img/mario.jpg" alt="Mario" class="img-responsive" style="width: 200px;">
                    </section>
                    <section class="column col-8">
                        <br>
                        <h5>Prof. Dr. Mario Henrique de Souza Pardo</h5>
                        <p>Coordenador do curso de Consultoria Web da FATEC Rio Preto</p>
                    </section>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Menu from '../components/shared/menu/Menu.vue';

export default {
    components: {
        'menu-navegacao': Menu
    }
};
</script>

<style>

</style>
