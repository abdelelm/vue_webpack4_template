<template>
  <v-footer
    dark
    height="auto"
    flex
  >
    <v-card
      flat
      tile
      class="black lighten-1 white--text text-xs-center footer"
    >
      <v-divider></v-divider>

      <v-card-text class="white--text">
        <br>
        &copy;2018 — <strong>Sciensano | {{$store.state.info.name}} ({{build}})</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name : "vfooter",
data() { 
return {
      build : window.BUILDVERSION,
      icons: []
    }
    }
}
</script>

<style>
.footer {
     width: 100%;
}
.color-white{
    color:white !important;
}
</style>
