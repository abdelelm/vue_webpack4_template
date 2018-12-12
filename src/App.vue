<template>
  <v-app>
      <loader />
      <navigation-navbar :menuitems="menu" v-on:toggle="show = !show" :languages="languages"/>
      <v-slide-y-transition>
        <navigation-sidebar :menuitems="menu" :show.sync="show" :fullwidth="false"/>
      </v-slide-y-transition>
      <v-content class="content">
          <router-view></router-view>
      </v-content>
      <error-handler />
	</v-app>
</template>

<script>
export default {
  name: "App",
   data() {
     return {
        languages : [
              { title: 'English' , icon :  "icon/us.png" , lang : "en"},
          { title: 'Français' , icon : "icon/fr.png" , lang : "fr" },
          { title: 'Nederlands' , icon :  "icon/nl.png", lang : "nl" }
        ],
         menu : [
        {
          name: "menu.home",
          path: "/",
          icon:"home",
          connected : false
        },
        {
          name: "menu.aboutus",
          path: "/aboutus",
          icon:"info",
          decal : 200,
          disableactive : true,
          connected : false
        },
           {
          name: "menu.login",
          path: "/login",
          icon:"info",
          decal : 200,
          disableactive : true,
          connected : false
        },
        {
          name: "Log Out",
          path: "/logout",
          connected : true
        }],
         show : false,
     }
 }
};
</script>
