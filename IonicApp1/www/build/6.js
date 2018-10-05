webpackJsonp([6],{

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoPageModule", function() { return InfoPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messagenew__ = __webpack_require__(350);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var InfoPageModule = /** @class */ (function () {
    function InfoPageModule() {
    }
    InfoPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__messagenew__["a" /* MessagenewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__messagenew__["a" /* MessagenewPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__messagenew__["a" /* MessagenewPage */]
            ]
        })
    ], InfoPageModule);
    return InfoPageModule;
}());

//# sourceMappingURL=messagenew.module.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagenewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MessagenewPage = /** @class */ (function () {
    function MessagenewPage() {
    }
    MessagenewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-messagenew',template:/*ion-inline-start:"J:\5551Project\IonicMaxApp\src\pages\messagenew\messagenew.html"*/'<ion-header>\n    <ion-navbar color="primary">\n      <ion-title text-center>Message</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div padding>\n    <button ion-button block >\n      <li class="icon-md-light">\n        Set Watching List\n      </li>\n    </button>\n  </div>\n  <ion-list>\n    <ion-item>\n      <ion-thumbnail item-start>\n        <img src="http://www.runoob.com/try/demo_source/license-to-ill.jpg">\n      </ion-thumbnail>\n      <h2>Weezer</h2>\n      <p>Blue Album</p>\n    </ion-item>\n    <ion-item>\n      <ion-thumbnail item-start>\n        <img src="http://www.runoob.com/try/demo_source/dookie.jpg">\n      </ion-thumbnail>\n      <h2>Smashing Pumpkins</h2>\n      <p>Siamese Dream</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"J:\5551Project\IonicMaxApp\src\pages\messagenew\messagenew.html"*/
        })
    ], MessagenewPage);
    return MessagenewPage;
}());

//# sourceMappingURL=messagenew.js.map

/***/ })

});
//# sourceMappingURL=6.js.map