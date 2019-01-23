module.exports = {
    methods: {
        image(img) {
            if (img.toLowerCase().indexOf("http") == -1)
                img = require("../images/" + img);
            return img;
        },
        static(img) {
            if (img.toLowerCase().indexOf("http") == -1)
                img = require("../static/" + img);
            return img;
        }
    }
}