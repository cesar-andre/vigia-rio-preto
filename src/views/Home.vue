<template>
  <div>
      <menu-navegacao />
      <div class="google-map" id="mapa"></div>
  </div>
</template>

<script>
import Menu from '../components/shared/menu/Menu.vue';
import { rankings } from '@/firebase';
import seguro from "../assets/img/seguro.png"
import moderado from "../assets/img/moderado.png"
import perigoso from "../assets/img/perigoso.png"

export default {
    components: {
        'menu-navegacao': Menu
    },
    data() {
        return {
            rankeds: []
        }
    },
    created() {
        let body = document.getElementsByTagName("body")[0];
        body.style.overflow = 'hidden';

        rankings.all().then(snapshot => {
            snapshot.forEach(ranking => {
                let rank = ranking.data();
                rank.id = ranking.id;
                this.rankeds.push(rank);
            });
        });
    },
    computed: {
    },
    mounted() {

        let element = document.getElementById("mapa");
        let options = {
            center: new google.maps.LatLng(-20.793313, -49.400080),
            zoom: 17
        }
        let map = new google.maps.Map(element, options);


        let geocoder = new google.maps.Geocoder();

        rankings.all().then(snapshot => {
            snapshot.forEach(ranking => {
                let rank = ranking.data();
                rank.id = ranking.id;

                let icon = null;

                if(rank.value > 0) {
                    icon = seguro;
                }

                if(rank. value < 0) {
                    icon = perigoso;
                }

                if (rank.value == 0) {
                    icon = moderado;
                }


                let contentString = "<div id='content'>" + rank.street + "<br> Pontuação: " + rank.value + " </div>";;
                let infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                geocoder.geocode({'address': rank.street, 'location': new google.maps.LatLng(-20.829612, -49.397337) }, function(results, status) {

                if (status === 'OK') {
                    //let marcador = new google.maps.LatLng(-20.793313, -49.400080);
                    //map.setCenter(results[0].geometry.location);
                    let marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        icon: icon
                        });
                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });
                    } else { 
                    console.log('Geocode não achou o endereço pelo motivo: ' + status);
                    }
                });


            });
        });   

    },
    destroyed() {
        let body = document.getElementsByTagName("body")[0];
        body.style.overflow = '';
    },
    methods: {
    }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: gray;
}
</style>
