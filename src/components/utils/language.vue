<template>
    <v-menu offset-y>
      <v-btn
        slot="activator"
        class="elevation-0"
        flat
       
      >
         <img  v-src="selected.icon" :alt="selected.title" />
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item, index) in languages"
          :key="index"
          @click="selectLang(item)"
        >
          <v-list-tile-action>
             <img v-src="item.icon"  :alt="item.title" />
            </v-list-tile-action>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
</template>

<script>
export default {
  name : "language" ,
  props : ["languages"],
  data: () => ({
      selected : {}
    }),
    mounted(){
      this.selected = this.languages.find(x => x.lang === this.$i18n.locale) || {};
    },
     methods: {
        selectLang(item){
          if(item.lang == this.selected.lang)
             return;

            this.selected = item;
            this.$i18n.locale = item.lang;
        }
    }
   
}
</script>

<style>

</style>
