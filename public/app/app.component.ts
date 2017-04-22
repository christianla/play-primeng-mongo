import {Component, OnInit} from "@angular/core";

import {CarService} from "./services/car.service";
import {Car} from "./entities/car.entity";

@Component({
  selector: 'my-app',
    template: `
        <p-dataTable [value]="cars" selectionMode="single" [(selection)]="selectedCar" (onRowSelect)="onRowSelect($event)" (onRowUnselect)="onRowUnselect($event)" 
         [paginator]="true" rows="15" [responsive]="true" dataKey="vin" [metaKeySelection]="false" >
            <p-header>CRUD for Cars</p-header>
            <p-column field="vin" header="Vin" [sortable]="true"></p-column>
            <p-column field="year" header="Year" [sortable]="true"></p-column>
            <p-column field="brand" header="Brand" [sortable]="true"></p-column>
            <p-column field="color" header="Color" [sortable]="true"></p-column>
            <p-footer><div class="ui-helper-clearfix" style="width:100%">
                <button type="button" pButton icon="fa-plus" style="float:left" (click)="showDialogToAdd()" label="Add"></button>
                <button type="button" pButton icon="fa-floppy-o" style="float:left" (click)="saveAll()" label="SaveAll"></button>
                <button type="button" pButton icon="fa-trash-o" style="float:left" (click)="clear()" label="ClearAll"></button>
            </div></p-footer>
        </p-dataTable>
        
        <p-dialog header="Car Details" [(visible)]="displayDialog" [responsive]="true" showEffect="fade" [modal]="true">
            <div class="ui-grid ui-grid-responsive ui-fluid" *ngIf="car">
                <div class="ui-grid-row">
                    <div class="ui-grid-col-4"><label for="vin">Vin</label></div>
                    <div class="ui-grid-col-8"><input pInputText id="vin" [(ngModel)]="car.vin" /></div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-4"><label for="brand">Year</label></div>
                    <div class="ui-grid-col-8"><input pInputText id="brand" [(ngModel)]="car.year" /></div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-4"><label for="brand">Brand</label></div>
                    <div class="ui-grid-col-8"><input pInputText id="brand" [(ngModel)]="car.brand" /></div>
                </div>
                <div class="ui-grid-row">
                    <div class="ui-grid-col-4"><label for="color">Color</label></div>
                    <div class="ui-grid-col-8"><input pInputText id="color" [(ngModel)]="car.color" /></div>
                </div>
            </div>
            <p-footer>
                <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
                    <button type="button" pButton icon="fa-close" (click)="remove()" label="Delete" [disabled]="selectedCar==null"></button>
                    <button type="button" pButton icon="fa-check" (click)="save()" label="Save"></button>
                </div>
            </p-footer>
        </p-dialog>
`
})
export class AppComponent  implements OnInit{

    displayDialog: boolean;

    car: Car = new PrimeCar("", "", "", "");

    selectedCar: Car;

    newCar: boolean;

    cars: Car[];

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCars().then(cars => this.cars = cars);
    }

    showDialogToAdd() {
        this.newCar = true;
        let car = new PrimeCar("", "", "", "");
        this.displayDialog = true;
    }

    save() {
        if(this.newCar){
            this.cars.push(this.car);
            this.carService.addCar(this.car);
        }
        else{
            this.cars[this.findSelectedCarIndex()] = this.car;
            this.carService.updateCar(this.car);
        }

        this.car = null;
        this.displayDialog = false;
    }

    saveAll() {
        this.carService.saveCars();
    }

    clear() {
        this.cars=null;
        this.carService.clearCars();
    }

    remove() {
        let result = this.carService.remove(this.car);
        console.log('remove:'+result)
        this.cars.splice(this.findSelectedCarIndex(), 1);
        this.car = null;
        this.displayDialog = false;
    }

    onRowSelect(event:any) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    }

    onRowUnselect(event:any) {
        console.log('unselect: '+event.data.brand);
        this.selectedCar=null;
        this.car=new PrimeCar("","","","")
    }

    cloneCar(c: Car): Car {
        let car = new PrimeCar("", "", "", "");
        for(let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }

    findSelectedCarIndex(): number {
        return this.cars.indexOf(this.selectedCar);
    }
}

class PrimeCar implements Car {

    constructor(public vin:String, public year:String, public brand:String, public color:String) {}
}