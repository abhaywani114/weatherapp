
<template>
    <div style="margin:10px 5%;">
        <span>Allow location and refresh to get latest weather update.</span>
    </div>
</template>

<script>
import store from "@/store/index.js";
export default {
    name: "Home",
    computed: {
        apikey() {
            return store.state.weather_api.key
        }
    },
    mounted() {
        navigator.geolocation.getCurrentPosition( (data) => {
        this.$router.push({ name: 'weatherByCity', params:{
            key: `${data.coords.latitude} ${data.coords.longitude}`
        }});
        });
    }
}
</script>

<style scoped>
</style>