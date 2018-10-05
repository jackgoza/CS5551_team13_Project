webpackJsonp([8],{

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login__ = __webpack_require__(357);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */]
            ]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4____ = __webpack_require__(224);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, user, toastCtrl, translateService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.user = user;
        this.toastCtrl = toastCtrl;
        this.translateService = translateService;
        // The account fields for the login form.
        // If you're using the username field with or without email, make
        // sure to add it to the type
        this.account = {
            email: 'max@umkc.edu',
            username: 'max',
            password: 'max'
        };
        this.translateService.get('LOGIN_ERROR').subscribe(function (value) {
            _this.loginErrorString = value;
        });
    }
    LoginPage.prototype.signup1 = function () {
        this.navCtrl.push('SignupPage');
    };
    // Attempt to login in through our User service
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        this.user.login(this.account).subscribe(function (resp) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4____["b" /* MainPage */]);
        }, function (err) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4____["b" /* MainPage */]);
            // Unable to log in
            var toast = _this.toastCtrl.create({
                message: _this.loginErrorString,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"J:\5551Project\IonicMaxApp\src\pages\login\login.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title text-center>{{ \'LOGIN_TITLE\' | translate }}</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="signup1()">{{ \'SIGNUP_BUTTON\' | translate}}</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <form (submit)="doLogin()">\n    <ion-list>\n\n      <ion-item>\n        <ion-label fixed>{{ \'EMAIL\' | translate }}</ion-label>\n        <ion-input type="email" [(ngModel)]="account.email" name="email"></ion-input>\n      </ion-item>\n\n      <!--<ion-item>-->\n        <!--<ion-label floating>{{ \'USERNAME\' | translate }}</ion-label>-->\n        <!--<ion-input type="text" [(ngModel)]="account.username" name="username"></ion-input>-->\n      <!--</ion-item>-->\n\n      <ion-item>\n        <ion-label fixed>{{ \'PASSWORD\' | translate }}</ion-label>\n        <ion-input type="password" [(ngModel)]="account.password" name="password"></ion-input>\n      </ion-item>\n\n      <div padding>\n        <button ion-button color="primary" block>{{ \'LOGIN_BUTTON\' | translate }}</button>\n      </div>\n    </ion-list>\n  </form>\n\n  <div padding text-center>\n    <a color="primary">{{ \'LOGIN_OPTION\' | translate }}</a>\n  </div>\n  <ion-buttons text-center>\n    <button ion-button calm>Facebook</button>\n    <button ion-button calm>Twitter</button>\n    <button ion-button red>Google</button>\n  </ion-buttons>\n</ion-content>\n\n<ion-footer>\n  <ion-navbar>\n    <ion-buttons text-center>\n      <button ion-button (click)="signup1()">{{ \'SIGNUP_BUTTON\' | translate}}</button>\n      <button ion-button><b>|</b></button>\n      <button ion-button>{{ \'FORGOT_PASSWORD\' | translate}}</button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-footer>\n'/*ion-inline-end:"J:\5551Project\IonicMaxApp\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers__["d" /* User */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=8.js.map