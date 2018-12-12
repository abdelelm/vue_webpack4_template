export default {
   data(){
       return {
         mobile : false
       }
     },
     mounted(){
     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        this.mobile = true;
     }
   },
    methods: {
       s(img) {
           if(img.toLowerCase().indexOf("http") == -1)
               img = require("../images/" + img);
           return img;
       }
    }
}