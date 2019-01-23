<template>
  <v-app app>
      <navigation-navbar  :menuitems="menu" v-on:toggle="show = !show">
          <template  slot="postmenu">
               <v-toolbar-items>
                    <language v-if="languages.length > 0" :languages="languages"/>
            </v-toolbar-items>
          </template>
         <template slot="platform_name">
              ADMIN
              <b class="s">{{$store.state.info.name_split[0] | up}}</b>
              <span class="p">{{$store.state.info.name_split[1] | up}}</span>
         </template>
      </navigation-navbar>
      <v-slide-y-transition>
        <navigation-sidebar :menuitems="menu" :show.sync="show" :fullwidth="false"/>
      </v-slide-y-transition>
      <v-content >
         <v-container fluid>
              <slot />
          </v-container>
      </v-content>
      <vfooter />
	</v-app>
</template>

<script>
export default {
    props : ["layoutdata"],
    data() {
        return {
                show: false,
                languages: [{
                        title: 'English',
                        icon: "icon/us.png",
                        lang: "en",
                        fallback: null
                    },
                    {
                        title: 'Français',
                        icon: "icon/fr.png",
                        lang: "fr",
                        fallback: "en"
                    },
                    {
                        title: 'Nederlands',
                        icon: "icon/nl.png",
                        lang: "nl",
                        fallback: "en"
                    }
                ],
                menu: [{
                        name: "menu.home",
                        path: "/",
                        icon: "home",
                        connected: false
                    },
                    {
                        name: "menu.products",
                        path: "/products",
                        icon: "info",
                        connected: true
                    },
                    {
                        name: "menu.administration",
                        path: "/administration",
                        icon: "info",
                        connected: true,
                        role: "Admin"
                    },
                    {
                        name: "menu.upload",
                        path: "/upload",
                        icon: "info",
                        connected: true,
                        role: "Admin"
                    },
                    {
                        name: "menu.login",
                        path: "/login",
                        icon: "info",
                        strict: true,
                        connected: false
                    }
                ]
            }
            }
}
</script>

<style>

</style>
