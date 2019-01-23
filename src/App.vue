<template>
 <div>
        <component v-if="exist(layout)" :is="layout" :layoutdata="layoutdata">
            <router-view></router-view>
        </component>
        <div v-else>
            <router-view></router-view>
        </div> 
   </div>
</template>

<script>

export default {
    data() {
       return { layout : this.getLayout() }
    },
    
    methods : {
         exist(layout) {
            return this.$options.components[layout]
        },
         getLayout() {
             var current = this.$router.getMatchedComponents()[0];
             return current.layout ||  this.$route.meta.layout || "default";
        },
    },
    watch : {
        "$route" : function(n ,p) {
                var lay = this.getLayout();
                if(lay !== this.layout)
                    this.layout = lay;
        }
    },
    computed:{
        layoutdata() {
                var { layoutdata } = this.$router.getMatchedComponents()[0];
                if(!layoutdata)
                    return null;

                if(typeof layoutdata == "function"){
                        return layoutdata();
                }
                return layoutdata;
        }   
    }
}
</script>

<style>

</style>
