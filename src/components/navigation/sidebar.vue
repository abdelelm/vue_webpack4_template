<template>
<v-navigation-drawer temporary v-model="sh" class="sidemenu">
    <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
             
            </v-list-tile-avatar>
            <v-list-tile-content>
              <router-link to="/">
            
              </router-link>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    <v-list class="pt-0" dense>
        <v-divider></v-divider>
    <slot name="premenu"></slot>
      <v-list-tile v-for="item in  itemswithrights()" 
      v-bind:key="item.name"
      router
      :active-class="'v-list__tile--active'  + (item.disableactive ? ' disableactive' : '')"
      @click="Close(item)"
      v-bind:to="item.path">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>{{$t(item.name)}}</v-list-tile-content>
      </v-list-tile>
        <hr>
       <slot name="postmenu"></slot>
    </v-list>
  </v-navigation-drawer>
</template>
<style>
.sidemenu {
  height: 100vh;
  position :fixed;
}
.disableactive:before, .disableactive:before, .disableactive:hover:before{
    background-color: initial !important;
}
</style>
<script>
export default {
  props: {
    menuitems: {
      default: () => [],
      type: Array
    },
    title: {
      default: "",
      type: String
    },
    show: {
      default: false,
      type: Boolean
    },
    fullwidth: {
      default: false,
      type: Boolean
    }
  },
  data(){
       return { sh : this.show}
  },
  watch: {
    sh: function (newQuestion, oldQuestion) { 
      this.$emit('update:show', this.sh)
    },
    show: function (newQuestion, oldQuestion) { 
      this.sh =  this.show;
    }
  },
  methods : {
    Close(item)
    {
       this.sh = false;
    },
     itemswithrights(){
        return this.menuitems.filter(x => this.hasRight(x));
    }
  },
  computed: {
    getClass() {
      var cl = "hidden-md-and-up";
      if (this.fullwidth) cl += " fullwidth";

      return cl;
    } ,
   
  }
};
</script>
