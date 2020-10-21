<template>
    <div class="city_header">
        <div class="place_info">
            <span class="location_name">{{location.name}}</span>
            <span class="location_detail">{{location_details}}</span>
        </div>
        <div class="city_header">
            <span class="title_wr">Weather Report By City</span>
        </div>
    </div>

    <table>
      <thead>
        <tr>
            <td class="meta">Meta</td>
            <td class="info">Info</td>
        </tr>
    </thead>
    <tbody>
        <tr v-for="data in weather_data" :key="data.id">
            <td>{{data.meta}}</td>
            <td>{{data.value}}</td>
        </tr>
    </tbody>
</table>

<div class="forecast">
    <div class="forecast_unit" v-for="data in dayforecast"
    @click="showDayForecast(data.id)" :key="data.id">
        <img v-bind:src="'http://'+data.icon" class="forcast_img"/>
       <span>{{data.date}}</span>
       <span class="f_conditions">{{data.condition}}</span>
       <span class="f_tempture">{{data.tempture}}</span>
    </div>
</div>

<!-- <div class="forecast_hour">
    <div class="forecast_unit" v-for="data in hourlyForecast"
    @click="showDayForecast(data.id)" :key="data.id">
        <img v-bind:src="'http://'+data.icon" class="forcast_img"/>
       <span>{{data.date}}</span>
       <span class="f_conditions">{{data.condition}}</span>
       <span class="f_tempture">{{data.tempture}}</span>
    </div>
</div> -->

    <div v-if="dayForecastHasData">
    <table style="width:50%;margin-bottom:5%">
      <thead>
        <tr>
            <td class="meta">Time</td>
            <td class="info">Condition</td>
            <td class="info">Tempture</td>
        </tr>
    </thead>
    <tbody>
        <tr v-for="data in hourlyForecast" :key="data.id">
            <td>{{data.date}}</td>
            <td class="img_tble"> <img v-bind:src="'http://'+data.icon" /> 
                {{data.condition}} </td>
            <td>{{data.tempture}}</td>
        </tr>
    </tbody>
</table>
</div>
</template>      

<script>
import store from "@/store/index.js";
import axios from 'axios';
export default {
    name: "City",
    data() {
        return {
            weather_data:[],
            location: '',
            forecast: '',
            dayforecast:'',
            hourlyForecast:''
        }
    },
     computed: {
        currentFetchDataAddress() {
            return `http://${store.state.weather_api.url}/forecast.json?key=${store.state.weather_api.key}&days=7&q=`;
        },
        routeKey() {
            return this.$route.params.key
        },
        location_details() {
            return `${this.location.region} | ${this.location.country}`;
        },
        dayForecastHasData() {
            return this.hourlyForecast.length > 0;
        }
    },
    methods: {
        showDayForecast(id) {
            let find_record =  this.dayforecast.find((f) => {
                return f.id == id;
            }); 

            find_record = this.forecast.forecastday.find((f) => {
                return f.date == find_record.o_date;
            });
            console.log(find_record.hour)
            this.hourlyForecast = find_record.hour.map((f,i) => {
                return {
                    tempture: `${f.temp_c} C / ${f.temp_f} F`,
                    condition:   f.condition.text,
                    o_date: f.date,
                    date:   new Date(f.time).toLocaleTimeString(),
                    icon:   f.condition.icon,
                    id: i
                }
            });
        }
    },
    mounted() {
        let key =  this.routeKey;
        axios({
            url:  `${this.currentFetchDataAddress}${key}`,
            method: "GET",
            header: {}
        })
        .then(response =>{
            // handle success
            let data = response.data.current;
            this.location = response.data.location;
            this.forecast = response.data.forecast;

            this.weather_data = [
                {
                    "meta"      :   "Condition",
                    "value"     :   data.condition.text,
                },
                {
                    
                    "meta"      :   "Tempture (c)",  
                    "value"     :   data.temp_c,
                },  
                {
                    "meta"      :   "Tempture (f)", 
                    "value"     :   data.temp_f,
                },
                {
                    "meta"      :   "Wind Direction",
                    "value"     :   data.wind_dir
                },
                 {
                    "meta"      :   "Wind (kph)",
                    "value"     :   data.wind_kph
                },
                {
                    "meta"      :   "UV (kph)",
                    "value"     :   data.uv
                },
                {
                    "meta"      :   "Latitude",
                    "value"     :   this.location.lat
                },              
                {
                    "meta"      :   "Longitude",
                    "value"     :   this.location.lon
                },               
                {
                    "meta"      :   "Timezone",
                    "value"     :   this.location.tz_id
                }
            ];

            this.dayforecast = response.data.forecast.forecastday.map((f,i) => {
                return {
                    tempture: `${f.day.maxtemp_c} C / ${f.day.maxtemp_f} F`,
                    condition:   f.day.condition.text.toUpperCase(),
                    o_date: f.date,
                    date:   new Date(f.date).toDateString(),
                    icon:   f.day.condition.icon,
                    id: i
                }
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }
}
</script>

<style scoped>
.city_header {
    width:100%;
    margin: 20px auto;
    display:flex;
}
.place_info {
    width:30%;
    text-align:right;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #32a3a1;
    padding:15px;

}

.location_name {
    font-size: 20px;
    color:#32a3a1;
    font-weight: 700;
    letter-spacing: 1.5px;
    line-height: 1.5;
}

.location_detail {
    font-size: 13px;
    color: #6f6f6f;
    font-weight: 200;
    letter-spacing: 1px;
}
.city_header {
    width:69%;
    display: flex;
    align-items: center;
}
.title_wr {
    font-size: 30px;
    color: #32a3a1;
    padding: 5px 25px;
    width: 100%; 
}
table {
    width:50%;
    font-size:20px;
    margin:auto;
    border-bottom: 1px solid #32a4a1;
    border-radius: 10px;
    height:100px;
}
thead > tr {
    background: #32a4a1;
    color:#fff;
    padding: 10px;
}
.meta {
    width: 170px;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
}
.info {
    text-align:center;
    border-radius: 5px;
}
tbody > tr > td:nth-child(1) {
    text-align:center;
}
tbody > tr > td:nth-child(2) {
    padding: 0px 15px;
}
tbody > tr:nth-child(even) {
    background: #e1f3f2;;
}
tbody > tr > td {
    padding:8px;
}
.forecast {
    display: flex;
    align-items: center;
    justify-content: center;
}
.forecast_unit {
    width: 200px;
    margin: 20px 10px;
    cursor:pointer;
    padding: 10px;
    border: 1px solid #32a4a1;
    border-radius: 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
}
.forecast_unit:hover {
    transform: scale(1.1);
    box-shadow: 1px 1px 3px #32a4a1;
}
.forcast_img {
    height: auto;
    width: 35%;
    display: block;
    margin: auto;
}
.f_conditions {
    color: #32a3a1;
    font-size: 14px;
    margin: 5px 0px;
    font-weight: 600;
}
.f_tempture {
    font-weight:700;
}
.img_tble {
    display:flex;
    align-items: center;
    text-transform: capitalize;
}
.img_tble > img {
    width: 15%;
    height: 100%;
}
</style>