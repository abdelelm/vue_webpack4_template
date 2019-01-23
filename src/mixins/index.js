

var mixins = [
    require("./ressource"),
    require("./utils")
]
module.exports = function (register) {
    mixins.forEach(mix => register(mix));
};