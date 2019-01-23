# Vue Webpack 4.0 Template ![CI status](https://img.shields.io/badge/build-passing-brightgreen.svg)

This repository contains a template for VueJs :

## Features

* Routing with vue-router
* State management with vuex
* Internazionalization with vue-i18n
* 404 Page
	* Returns 404 HTTP code
* Progressive Web App (service worker) 
* Offline support 
* Graceful error handling
	* Catch errors and handle them with ease
* Build process managed by Webpack
	* Write Javascript in ES6, Babel will transpile
	* Write style in Sass
	* Code splitting and dynamic loading
		* Separate the requirements from your code
	* Automatic generation of Service Worker
	* Uglify and minify your JS
	* Automatic global registration of routing based on folder structure
   * Automatic global registration of components based on folder structure
* Fully customizable
* Vuetify integration 
* Some basic mixins, directive and filters
* Layout system 

## Folder structure
```
.
├─ build
│  └── webpack.config.js
├─ config.js
├─ language.js
├─ package.json
└─ src
   ├── components
   ├── directives
   ├── filters
   ├── i18n
   ├── images
   ├── layouts
   ├── mixins
   ├── router
   ├── static
   ├── store
   ├── styles
   ├── views
   ├── store
   ├── i18n
   ├── app.js
   ├── app.vue
   ├── app.js
   └── index.template.html
