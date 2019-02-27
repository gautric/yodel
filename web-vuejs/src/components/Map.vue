<template lang="html">

  <section class="map">
    <div id="mapid"></div>

    <div>
      <pre>lat {{lattitude}}</pre>
      <pre>long {{longitude}}</pre>
      <pre>zoom {{zoom}}</pre>
    </div>
  </section>

</template>

<script lang="js">

  import L from 'leaflet'

  export default  {
    name: 'Map',
    props: {
      long:{
        type: String,
        required: true
      },
      lat:{
        type: String,
        required: true
      },
    },
    mounted() {
      this._leaflet = L.map('mapid').setView([this.lat, this.long], this.zoom);
      console.log(process.env);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Yodel / Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
      //  accessToken: 'pk.eyJ1IjoiZ3JlZ2lvIiwiYSI6ImNqc2x5d3J3dTFmYjk0NGxpcnhzcTNzbGMifQ.dcEOjBDtjMlxSkl4HYghvA'
       accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN

    }).addTo(this._leaflet);

      this._leaflet.on("moveend", this.move);
      this._leaflet.on("move", this.move);

    },
    data: function () {
        return {
          _leaflet: undefined,
          longitude: this.long,
          lattitude: this.lat,
          zoom: 12
        }
    },
    methods: {
      move: function(e){
        this.longitude = this._leaflet.getCenter().lng;
        this.lattitude = this._leaflet.getCenter().lat;
        this.zoom = this._leaflet.getZoom();
      }
    },
    computed: {
    }
}
</script>

<style scoped lang="scss">
  .map {
    display: block;
    margin-left: auto;
    margin-right: auto
  }

  #mapid { width: 80%; height: 450px; }

</style>
