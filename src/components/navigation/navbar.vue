<template>
  <v-toolbar :class="getClass">
    <router-link to="/">
      <v-toolbar-title><img :src="s('logo.png')" class="icon-brand" /><h4>{{$store.state.info.name.toUpperCase()}}</h4></v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-if="item.connected == undefined || $store.state.connected == item.connected"  :active-class="'v-btn--active'  + (item.disableactive ? ' disableactive' : '')" v-for="item in menuitems"  :to="{ path : item.path }" :key="item.name" flat>
        {{$t(item.name)}}
      </v-btn>
    </v-toolbar-items>
     <v-toolbar-items>
      <language v-if="languages.length > 0" :languages="languages" />
     </v-toolbar-items>
    <v-toolbar-side-icon v-if="menuitems.length > 0" class="hidden-md-and-up" @click="Open()"></v-toolbar-side-icon>
  </v-toolbar>
</template>
<style>
 nav {
    z-index: 1001;
    background:white;
 }
 .logo {
       float: left;
       margin-right:15px;
 }
.fixed {
  position:fixed;
}
.disableactive:before, .disableactive:before, .disableactive:hover:before{
    background-color: white !important;
}
.icon-brand {
   width: 28px;
    float: left;
}
.v-toolbar__title {
  overflow:visible;
}
</style>

<script>
export default {
  props:  {
    menuitems: {
      default: () => [],
      type: Array
    },
    languages: {
      default: () => [],
      type: Array
    },
    fixed : {
      default: false,
      type: Boolean
    },
     title: {
      default: "",
      type: String
    }
  },
  methods: {
    Open() {
      this.$emit('toggle')
    }

  },
   computed: {
    getClass() {
      var cl = "";
      if (this.fixed != false) cl += " fixed";

      return cl;
    }
  }
};
</script>