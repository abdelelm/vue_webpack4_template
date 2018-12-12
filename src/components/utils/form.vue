<template>
   <v-form ref="form" v-model="valid">
       <v-alert
      :value="!isValid()"
      type="error"
    >
      {{getError()}}
    </v-alert>
     <slot></slot>
      <v-btn :class="'submit ' + position" v-if="submitable" :disabled="!valid || request_started " :loading="request_started"  @click="submit">
        {{submitText}}
      </v-btn>
     <v-btn v-if="clearable" @click="clear" >clear</v-btn>
   </v-form>
</template>
<style lang="scss">
.submit {
  display: block;
  &.l {
    margin-left:0
  }
  &.r {
    margin-left: auto;
    margin-right:0
  }
  &.c {
    margin:auto;
  }
}

</style>

<script>
  export default {
    name : "vform",
    data() {
      return {
        valid : false,
        request_started :  false
      }
    },
    props : {
        "api" : {
          default: null,
          type: String
        },
        "onSuccess" : {
          default: () => {},
          type: Function
        },
        "rules" : {
          default:  function () { return [] },
          type: Array
        },
        "onError" : {
          default: () => {},
          type: Function
        },
       "post" : {
          type : Object
       },
       "method" : {
          default: "post",
          type: String
       },
        "clearable" : {
          default: false,
          type: Boolean
       },
         "submitable" : {
          default: false,
          type: Boolean
       },
       "submitText": {
          default: "SUBMIT",
          type: String
       },
       "submitPos": {
          default: "l",
          type: String
       }
    },
    computed : {
      position() {
        if(typeof this.submitPos !== "string" || ["l" , "r" , "c"].indexOf(this.submitPos.toLowerCase()) ==  -1)
            return "l";

        return this.submitPos.toLowerCase();

      }
    },
    mounted(){
        this.$emit('input',this.$refs.form)
    },
    methods:{
      clear () {
        this.$refs.form.reset()
      },
      isValid() {
         return this.rules.length == 0  ||  this.rules.find(x => x() !== true)  === undefined;
      },
      getError() {
         var el =  this.rules.find(x => x() !== true);
         if(el)
          return el();
         return "";
      },
      submit () {
        if (this.$refs.form.validate() && this.isValid()) {
          // Native form submission is not yet supported
          if(this.api)
          {
             this.request_started = true;
             var disable = (e) => { this.request_started = false; return e;} ;
             var met = this.method.toLowerCase() ===  "post" ? this.Post : this.Get;
             met(this.api,this.post).then(disable).catch(disable).then((e) => {
               if(!e.error)
                 this.onSuccess(e);
               else
                 this.onError(e);
             }).catch(this.onError)
          }
        
        }
      },
    }
  }
</script>