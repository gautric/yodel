<template lang="html">

  <section class="map">
    <div class="container-fluid">

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Map</h3>
        </div>
        <div class="panel-body" id="mapid">
        </div>
      </div>

      <div class="container-fluid container-cards-pf">
        <div class="row row-cards-pf">
          <div class="col-xs-6 col-sm-4 col-md-4">
            <div class="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 class="card-pf-title">
                <span class="mdi mdi-message-text"/> Message
              </h2>
              <div class="card-pf-body">
                {{message}}
              </div>
            </div>
          </div>
          <div class="col-xs-6 col-sm-4 col-md-4">
            <div class="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 class="card-pf-title">
                 <span class="mdi mdi-arrow-up-down-bold-outline"/> Lattitude
              </h2>
              <div class="card-pf-body">
                {{lattitude}}
              </div>
            </div>
          </div>
          <div class="col-xs-6 col-sm-4 col-md-4">
            <div class="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 class="card-pf-title">
                <span class="mdi mdi-arrow-left-right-bold-outline"/> Longitude
              </h2>
              <div class="card-pf-body">
                {{longitude}}
              </div>
            </div>
          </div>
          <div class="col-xs-6 col-sm-4 col-md-4">
            <div class="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 class="card-pf-title">
                <span class="mdi mdi-clock-outline"/> Time
              </h2>
              <div class="card-pf-body">
                {{created_at}}
              </div>
            </div>
          </div>
          <div class="col-xs-6 col-sm-4 col-md-4">
            <div class="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 class="card-pf-title">
                <span class="mdi mdi-magnify-plus-outline"/> Zoom
              </h2>
              <div class="card-pf-body">
                {{zoom}}
              </div>
            </div>
          </div>
          <div class="col-xs-6 col-sm-4 col-md-4">
            <div class="card-pf card-pf-accented card-pf-aggregate-status">
              <h2 class="card-pf-title">
                <span class="mdi mdi-counter"/> Counter
              </h2>
              <div class="card-pf-body">
                {{counter}}
              </div>
            </div>
          </div>
        </div>
      </div>

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

  //    this.$options.sockets.onmessage = (event) => console.log(event);

      this.$options.sockets.onmessage = this.onmessage;


      this._leaflet = L.map('mapid').setView([this.lat, this.long], this.zoom);
      console.log(process.env);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Yodel / Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
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
          zoom: 12,
          message:'',
          created_at:'',
          counter: 0
        }
    },
    methods: {
      move: function(e){
        this.longitude = this._leaflet.getCenter().lng;
        this.lattitude = this._leaflet.getCenter().lat;
        this.zoom = this._leaflet.getZoom();
      },
      onmessage: function(event){
        var data = JSON.parse(event.data);
        console.log(data);
        if(data.coordinates.type==='Point') {
          this._leaflet.panTo(new L.LatLng(data.coordinates.coordinates[1], data.coordinates.coordinates[0]));
          this.message = data.payload;
          this.created_at = data.created_at;
          this.counter = this.counter+1;
        }
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

  #mapid { height: 550px; }

</style>
