<template>
    <div>
        <form action="javascript:void(0)">
            <div class="clearfix">
                <input v-model="address"  @keydown.enter="searchLocation" type="text" class="form-control width-300  pull-left">
                <button @click="searchLocation" :disabled="loading"
                        type="button" class="btn btn-primary pull-left ml20">Adres Ara</button>
            </div>
            <div id="googleMap" class="mt20" style="height: 300px"></div>
        </form>
    </div>

</template>

<script>

    export default {
        props: ["coordinate"],
        data () {
            return {
                loading: false,
                address: "",
                map: null,
                geocoder: null,
                markers: []
            }
        },
        computed: {},
        mounted(){
            this.loadGoogleMap(this.coordinate);

        },
        methods: {
            loadGoogleMap(loc){
                if(!loc || loc.lat == null || loc.lon == null) {
                    loc = {
                        "lat": 40.979391,
                        "lon": 29.084630
                    };
                }

                loc = {lat: loc.lat, lng: loc.lon};

                this.geocoder = new google.maps.Geocoder();

                this.map = new google.maps.Map(document.getElementById('googleMap'), {
                    center: loc,
                    zoom: 16
                });

                this.map.addListener('click', (e) => {

                    this.coordinate.lat = e.latLng.lat();
                    this.coordinate.lon = e.latLng.lng();

                    this.deleteMarkers();
                    this.addMarker(e.latLng);


                });

                this.addMarker(loc);
            },
            // Adds a marker to the map and push to the array.
            addMarker(loc) {
                var marker = new google.maps.Marker({
                    position: loc,
                    map: this.map
                });
               // this.map.setCenter(loc);
                this.markers.push(marker);
            },
            // Sets the map on all markers in the array.
            setMapOnAll(map) {
                for (var i = 0; i < this.markers.length; i++) {
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

                this.geocoder.geocode({'address': this.address}, (results, status) => {

                    this.loading = false;

                    if (status == 'OK') {
                        this.deleteMarkers();

                        var latlng = results[0].geometry.location;

                        this.addMarker(latlng);
                        this.map.setCenter(latlng);

                        this.coordinate.lat = latlng.lat();
                        this.coordinate.lon = latlng.lng();
                    } else {

                    }
                });

            }
        }
    }
</script>

<style lang="scss" scoped>


</style>
