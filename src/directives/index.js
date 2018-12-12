var imageDirective = function (el, binding, vnode) {
    var img = binding.value;
    if(!img)
        return;
    var valid = vnode.tag === "img";
    if(!valid)
        return;

    if(img.toLowerCase().indexOf("http") == -1)
        img = require("../images/" + img);
     el.src = img;
}

export default function (register) {
    register('src', {
        bind: imageDirective,
        update:imageDirective
      })
}