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
var car_service_1 = require("./services/car.service");
var AppComponent = (function () {
    function AppComponent(carService) {
        this.carService = carService;
        this.car = new PrimeCar("", "", "", "");
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCars().then(function (cars) { return _this.cars = cars; });
    };
    AppComponent.prototype.showDialogToAdd = function () {
        this.newCar = true;
        var car = new PrimeCar("", "", "", "");
        this.displayDialog = true;
    };
    AppComponent.prototype.save = function () {
        if (this.newCar) {
            this.cars.push(this.car);
            this.carService.addCar(this.car);
        }
        else {
            this.cars[this.findSelectedCarIndex()] = this.car;
            this.carService.updateCar(this.car);
        }
        this.car = null;
        this.displayDialog = false;
    };
    AppComponent.prototype.saveAll = function () {
        this.carService.saveCars();
    };
    AppComponent.prototype.clear = function () {
        this.cars = null;
        this.carService.clearCars();
    };
    AppComponent.prototype.remove = function () {
        var result = this.carService.remove(this.car);
        console.log('remove:' + result);
        this.cars.splice(this.findSelectedCarIndex(), 1);
        this.car = null;
        this.displayDialog = false;
    };
    AppComponent.prototype.onRowSelect = function (event) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    };
    AppComponent.prototype.onRowUnselect = function (event) {
        console.log('unselect: ' + event.data.brand);
        this.selectedCar = null;
        this.car = new PrimeCar("", "", "", "");
    };
    AppComponent.prototype.cloneCar = function (c) {
        var car = new PrimeCar("", "", "", "");
        for (var prop in c) {
            car[prop] = c[prop];
        }
        return car;
    };
    AppComponent.prototype.findSelectedCarIndex = function () {
        return this.cars.indexOf(this.selectedCar);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n        <p-dataTable [value]=\"cars\" selectionMode=\"single\" [(selection)]=\"selectedCar\" (onRowSelect)=\"onRowSelect($event)\" (onRowUnselect)=\"onRowUnselect($event)\" \n         [paginator]=\"true\" rows=\"15\" [responsive]=\"true\" dataKey=\"vin\" [metaKeySelection]=\"false\" >\n            <p-header>CRUD for Cars</p-header>\n            <p-column field=\"vin\" header=\"Vin\" [sortable]=\"true\"></p-column>\n            <p-column field=\"year\" header=\"Year\" [sortable]=\"true\"></p-column>\n            <p-column field=\"brand\" header=\"Brand\" [sortable]=\"true\"></p-column>\n            <p-column field=\"color\" header=\"Color\" [sortable]=\"true\"></p-column>\n            <p-footer><div class=\"ui-helper-clearfix\" style=\"width:100%\">\n                <button type=\"button\" pButton icon=\"fa-plus\" style=\"float:left\" (click)=\"showDialogToAdd()\" label=\"Add\"></button>\n                <button type=\"button\" pButton icon=\"fa-floppy-o\" style=\"float:left\" (click)=\"saveAll()\" label=\"SaveAll\"></button>\n                <button type=\"button\" pButton icon=\"fa-trash-o\" style=\"float:left\" (click)=\"clear()\" label=\"ClearAll\"></button>\n            </div></p-footer>\n        </p-dataTable>\n        \n        <p-dialog header=\"Car Details\" [(visible)]=\"displayDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\n            <div class=\"ui-grid ui-grid-responsive ui-fluid\" *ngIf=\"car\">\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"vin\">Vin</label></div>\n                    <div class=\"ui-grid-col-8\"><input pInputText id=\"vin\" [(ngModel)]=\"car.vin\" /></div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"brand\">Year</label></div>\n                    <div class=\"ui-grid-col-8\"><input pInputText id=\"brand\" [(ngModel)]=\"car.year\" /></div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"brand\">Brand</label></div>\n                    <div class=\"ui-grid-col-8\"><input pInputText id=\"brand\" [(ngModel)]=\"car.brand\" /></div>\n                </div>\n                <div class=\"ui-grid-row\">\n                    <div class=\"ui-grid-col-4\"><label for=\"color\">Color</label></div>\n                    <div class=\"ui-grid-col-8\"><input pInputText id=\"color\" [(ngModel)]=\"car.color\" /></div>\n                </div>\n            </div>\n            <p-footer>\n                <div class=\"ui-dialog-buttonpane ui-widget-content ui-helper-clearfix\">\n                    <button type=\"button\" pButton icon=\"fa-close\" (click)=\"remove()\" label=\"Delete\" [disabled]=\"selectedCar==null\"></button>\n                    <button type=\"button\" pButton icon=\"fa-check\" (click)=\"save()\" label=\"Save\"></button>\n                </div>\n            </p-footer>\n        </p-dialog>\n"
    }),
    __metadata("design:paramtypes", [car_service_1.CarService])
], AppComponent);
exports.AppComponent = AppComponent;
var PrimeCar = (function () {
    function PrimeCar(vin, year, brand, color) {
        this.vin = vin;
        this.year = year;
        this.brand = brand;
        this.color = color;
    }
    return PrimeCar;
}());
//# sourceMappingURL=app.component.js.map