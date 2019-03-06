<template lang="html">

  <section class="map">
    <div class="container-fluid">

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Map</h3>
        </div>
        <div class="panel-body" id="mapid"/>
      </div>

      <div class="container-fluid container-cards-pf">
        <div class="row row-cards-pf">

          <Card title="Message" icon="mdi-message-text" :text="info.payload"/>
          <Card title="Lattitude" icon="mdi-arrow-up-down-bold-outline" :text="lattitude"/>
          <Card title="Longitude" icon="mdi-arrow-left-right-bold-outline" :text="longitude"/>
          <Card title="Time" icon="mdi-clock-outline" :text="info.created_at"/>
          <Card title="Zoom" icon="mdi-magnify-plus-outline" :text="zoom"/>
          <Card title="Counter" icon="mdi-counter" :text="counter"/>
          <Card title="Lang" icon="mdi-flag" :text="info.lang"/>

        </div>
      </div>

    </div>
  </section>

</template>

<script lang="js">
import L from 'leaflet'

export default {
  name: 'Map',
  props: {
    long: {
      type: String,
      required: true
    },
    lat: {
      type: String,
      required: true
    },
  },
  mounted() {
    this.$options.sockets.onmessage = this.onmessage

    this._leaflet = L.map('mapid').setView([this.lat, this.long], this.zoom)
    console.log(process.env)
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Yodel / Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN

    }).addTo(this._leaflet)

    this._leaflet.on('moveend', this.move)
    this._leaflet.on('move', this.move)

  },
  data: function () {
    return {
      _leaflet: undefined,
      longitude: this.long,
      lattitude: this.lat,
      zoom: 12,
      counter: 0,
      info: {
        'payload': '',
        'lang': '',
        'created_at': ''
      }
    }
  },
  methods: {
    move: function (e) {
      this.longitude = this._leaflet.getCenter().lng
      this.lattitude = this._leaflet.getCenter().lat
      this.zoom = this._leaflet.getZoom()
    },
    onEachFeature: function (feature, layer) {
      // does this feature have a property named popupContent?
      if (feature.properties && feature.properties.text) {
        layer.bindPopup(feature.properties.text)
      }
    },
    onmessage: function (event) {
      var data = JSON.parse(event.data)
      if (data.coordinates.type === 'Point') {
        var position = new L.LatLng(data.coordinates.coordinates[1], data.coordinates.coordinates[0])

        this._leaflet.panTo(position)

        var geoJSON = {
          'type': 'Feature',
          'properties': {
            'text': data.payload
          },
          'geometry': data.coordinates
        }

        L.geoJSON(geoJSON, {
          onEachFeature: this.onEachFeature
        }).addTo(this._leaflet)

        this.info = data
        this.longitude = data.coordinates.coordinates[1]
        this.lattitude = data.coordinates.coordinates[0]
        this.counter = this.counter + 1
      }
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.map {
    display: block;
    margin-left: auto;
    margin-right: auto;
}

#mapid {
    height: 560px;
}
</style>
