var imageDirective = function (el, binding, vnode) {
    var img = binding.value;
    if(!img)
        return;
    var valid = vnode.tag === "img";
    if(!valid)
        return;

        try{
            if(img.toLowerCase().indexOf("http") == -1)
            img = require("../images/" + img);
         el.src = img;
        }
        catch(e){}
   
}
module.exports = imageDirective;