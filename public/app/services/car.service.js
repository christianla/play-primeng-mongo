"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var CarService = (function () {
    function CarService(http) {
        this.http = http;
        this.carsUrl = '/cars ';
    }
    CarService.prototype.getCars = function () {
        return this.http.get(this.carsUrl)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    CarService.prototype.saveCars = function () {
        return this.http.get('/saveCars')
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    CarService.prototype.addCar = function (car) {
        return this.http.put('/add', car)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    CarService.prototype.clearCars = function () {
        return this.http.get('/clearCars')
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    // getCarsSmall() {
    //     return this.http.get(this.carsUrl)
    //         .toPromise()
    //         .then(res => <Car[]> res.json().data)
    //         .then(data => { return data; });
    // }
    CarService.prototype.updateCar = function (car) {
        this.addCar(car);
    };
    CarService.prototype.remove = function (car) {
        console.log('remove car:' + car.vin);
        return this.http.delete('/deleteCar/' + car.vin)
            .toPromise()
            .then(function (res) {
            console.log('result: ' + res);
            return res.json();
        });
    };
    return CarService;
}());
CarService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CarService);
exports.CarService = CarService;
//# sourceMappingURL=car.service.js.map