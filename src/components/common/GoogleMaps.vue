<template>
  <form action="javascript:void(0)">
    <div class="clearfix">
      <div style="position:relative">
        <input
          v-model="address"
          @keydown.enter="searchLocation"
          type="text"
          class="form-control width-200 pull-left"
        >

        <button @click="searchLocation" :disabled="loading" type="button" class="btn-search">
          <i class="fa fa-search"></i>
        </button>
        <button @click="resetInput" :disabled="loading" type="button" class="btn-reset">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>
    <div class="google-map mt20" :style="{ height: height + 'px'}"></div>
    <div class="row mt20">
      <div class="col-md-6">
        <input v-model="coordinate.lat" type="text" disabled>
      </div>
      <div class="col-md-6">
        <input v-model="coordinate.lon" type="text" disabled>
      </div>
    </div>
  </form>
</template>

<script>
/*

        Using:

        Install:

        npm i google-maps --save

        HTML:

        <google-maps :coordinate="item" :height="250"></google-maps>

    */

import config from "src/config";

import GoogleMapsLoader from "google-maps";

GoogleMapsLoader.KEY = config.googleMapsKey;

export default {
  props: ["coordinate", "height"],
  data() {
    return {
      loading: false,

      defaultLat: 40.979391,
      defaultLon: 29.08463,

      defaultOptions: {
        zoom: 16
      },

      address: "",
      google: null,
      map: null,
      geocoder: null,
      markers: []
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.loadGoogleMap(this.coordinate);
  },
  methods: {
    loadGoogleMap(loc) {
      if (!loc || !loc.lat || !loc.lon) {
        loc.lat = this.defaultLat;
        loc.lon = this.defaultLon;
        loc.lng = this.defaultLon;
      }

      GoogleMapsLoader.load(google => {
        this.google = google;
        this.geocoder = new this.google.maps.Geocoder();

        this.map = new this.google.maps.Map(
          $(this.$el).find(".google-map")[0],
          {
            ...this.defaultOptions,

            center: loc
          }
        );

        this.map.addListener("click", e => {
          loc.lat = e.latLng.lat();
          loc.lon = e.latLng.lng();

          this.deleteMarkers();
          this.addMarker(e.latLng);
        });

        this.addMarker(loc);
      });
    },
    // Adds a marker to the map and push to the array.
    addMarker(loc) {
      var marker = new this.google.maps.Marker({
        position: loc,
        map: this.map
      });
      // this.map.setCenter(loc);
      this.markers.push(marker);
    },
    // Sets the map on all markers in the array.
    setMapOnAll(map) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },

    // Removes the markers from the map, but keeps them in the array.
    clearMarkers() {
      this.setMapOnAll(null);
    },

    deleteMarkers() {
      this.clearMarkers();
      this.markers = [];
    },

    searchLocation() {
      this.loading = true;

      this.geocoder.geocode({ address: this.address }, (results, status) => {
        this.loading = false;

        if (status == "OK") {
          this.deleteMarkers();

          var latlng = results[0].geometry.location;

          this.addMarker(latlng);
          this.map.setCenter(latlng);

          this.coordinate.lat = latlng.lat();
          this.coordinate.lon = latlng.lng();
        } else {
        }
      });
    },
    resetInput() {
      this.address = "";
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  position: absolute;

  &.btn-search {
    right: 50px;
    top: 8px;
  }

  &.btn-reset {
    right: 10px;
    top: 8px;
  }
}
</style>
