import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Car} from "../entities/car.entity";

@Injectable()
export class CarService {

    private carsUrl = '/cars ';

    constructor(private http: Http) {}

    getCars():Promise<Car[]> {
        return this.http.get(this.carsUrl)
            .toPromise()
            .then(res => { return res.json() });
    }

    saveCars():Promise<Boolean> {
        return this.http.get('/saveCars')
            .toPromise()
            .then(res => { return res.json() });
    }

    addCar(car:Car):Promise<Boolean> {
        return this.http.put('/add', car)
            .toPromise()
            .then(res => { return res.json() });
    }

    clearCars():Promise<Boolean> {
        return this.http.get('/clearCars')
            .toPromise()
            .then(res => { return res.json() });
    }

    updateCar(car: Car) {
        this.addCar(car);
    }

    remove(car: Car):Promise<Boolean> {
        console.log('remove car:'+car.vin);

        return this.http.delete('/deleteCar/'+car.vin)
            .toPromise()
            .then(res => {
                console.log('result: '+res);
                return res.json()
            });

    }
}