<template>
  <v-toolbar :class="getClass">
    <router-link to="/">
      <v-toolbar-title>
        <img v-if="logo" v-src="logo" class="icon-brand hidden-sm-and-down">
        <h4 class="oswald">
            <slot name="platform_name"></slot>
          <!-- <b class="s">FOOD</b>
          <span class="p">MONITORING</span> -->
        </h4>
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <slot name="premenu"></slot>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        :active-class="'v-btn--active'  + (item.disableactive ? ' disableactive' : '')"
        v-for="item in itemswithrights()"
        :to="{ path : item.path }"
        :key="item.name"
        flat
      >{{$t(item.name)}}</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
        <slot name="postmenu"></slot>
    </v-toolbar-items>
    <v-toolbar-side-icon v-if="itemswithrights().length > 0" class="hidden-md-and-up" @click="Open()"></v-toolbar-side-icon>
  </v-toolbar>
</template>
<style>

nav {
  z-index: 1001;
  background: white;
}

.logo {
  float: left;
  margin-right: 15px;
}

.fixed {
  position: fixed;
}

.disableactive:before,
.disableactive:before,
.disableactive:hover:before {
  background-color: white !important;
}

.icon-brand {
  width: 100px;
  margin-right: 10px;
  float: left;
}

.v-toolbar__title {
  overflow: visible;
}
</style>

<script>
export default {
  props: {
    logo : {
      default: undefined,
      type: String
    },
    menuitems: {
      default: () => [],
      type: Array
    },
    fixed: {
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
      this.$emit("toggle");
    },
    itemswithrights(){
        return this.menuitems.filter(x => this.hasRight(x));
    }
  },
  computed: {
    getClass() {
      var cl = "";
      if (this.fixed != false) cl += " fixed";
      return cl;
    },
    
  }
};
</script>
