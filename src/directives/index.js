var imageDir = require("./image");

module.exports = function (register) {
    register("src" , {
        bind: imageDir,
        update: imageDir
    });    
};