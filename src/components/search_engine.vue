<template>
    <div id="search_engine" class="search_box_div">
          <input class="search_input"
             v-model="search_input_text"
            placeholder="Location" />
          <div class="search_result"> 
             <ul class="result-ul">
                <router-link v-for="data in suggestion" :key="data.id"  
                    @click="selectSearchOption(data)"
                    :to="{ 'name':'weatherByCity', params:{key:data.url}}"
                    style="text-decoration:none;">
                   <li class="result-li" >{{data.name}}</li>
                 </router-link>
             </ul>
          </div>
        </div>
</template>

<script>
import store from "@/store/index.js";
import axios from 'axios'

export default {
    name: 'search_engine',
    data() {
        return {
            search_input_text: store.state.search_engine.value,
            suggestion: [],
        }
    },
    computed: {
        searchAddress() {
            return `http://${store.state.weather_api.url}/search.json?key=${store.state.weather_api.key}&q=`;
        },
        isSuggested() {
            return this.suggestion.length > 0;
        }
    },
    watch: {
        search_input_text(new_val) {
            if (new_val) {
                // var suggestion;
                axios({
                    url:  `${this.searchAddress}${new_val}`,
                    method: "GET",
                    header: {}
                })
                .then(response =>{
                    // handle success
                    this.suggestion = response.data.map((location) => {
                        return {
                            "id":   location.id,
                            "name": location.name,
                            "url":  location.url
                        }
                    });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            }
        }
    },
    methods: {
        selectSearchOption(data) {
            store.dispatch('setSearchEngine', data.name);
            this.suggestion = [];
        }
    }
}
</script>

<style scoped>

.search_input {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
     width:90%;
}

.search_input:focus {
  border:none;
  outline: none;
  box-shadow: -2px 0px 6px #74ab1f;
  /* transform: scale(1.1); */
}

.search_box_div {
  position: relative;
  display:block;
  margin: 25px auto;
  width:30%;
}
.search_result {
  position: absolute;
  top: 32px;
  width: 100%;
}
.result-ul {
    margin: 0;
    padding: 0px 10px;
    list-style: none;
}
.result-li {
    background: #fff;
    padding: 10px 15px;
    text-align: left;
    cursor:pointer;
    font-size: 15px;
    letter-spacing: 1.1px;
    color: #4c4242;
}
.result-li:hover {
    font-weight: 700;
    /* transform: scale(1.1); */
}
</style>