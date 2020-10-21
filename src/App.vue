<template>
    <nav>
    <search_engine />        
    </nav>

   <router-view />
  
</template>

<script>

 import search_engine from "@/components/search_engine.vue";

export default {
  name: 'Main Page',
  components: {
    search_engine
  },
}
</script>
<style>
nav {
  padding: 0% 5%;
  background: #32a3a1;
  text-align: center; 
  display:flex;
  height:80px;
}

body {
  background: #fff;
  margin: 0px;
  padding:0px;
  font-family: monospace;
}
</style>
