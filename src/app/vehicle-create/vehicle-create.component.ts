import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { monthConst } from './../shared/months-const';
import { format } from 'url';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss']
})
export class VehicleCreateComponent implements OnInit {
  @Output()
  public vehiclesEmitter: EventEmitter<IVehicles[]> = new EventEmitter<IVehicles[]>();

  listVehicle: IVehicles[] = [];
  vehicle: IVehicles = {licensePlate: '',
                      class: '',
                      odometer: '',
                      fuelType: ''}
  constructor() { }

  ngOnInit() {
    this.setVisibility('hidden');
  }


  addVehicle(form) {
    this.vehicle = form.value;
    if(this.listVehicle.length === 0) {
        this.addList();
    } else {
      if(!this.listVehicle.find( el => el.licensePlate === form.value.licensePlate)) {
          this.addList();
      }
    }
    form.reset();
    this.vehicle = {};
  }

  addList() {
    this.vehicle.manufacture = 'vw';
    this.vehicle.lastDrive = [{driveId: '1234', driverName:'John Doe'}];
    this.listVehicle.push(this.vehicle);
    this.setVisibility('visible');
    console.log(this.listVehicle);
  }


  submit() {
    console.log(Date())
    const currentDate = Date().split(' ');
    const currentMonth = monthConst.indexOf(currentDate[1]);
    const currentHours = currentDate[4].split(':');

    if(sessionStorage.getItem('date')) {
      const date = sessionStorage.getItem('date').split(' ');
      const month = monthConst.indexOf(date[1]);
      const hours = currentDate[4].split(':');

      ///If the current year, month or day is greater than the year, month or from 2 days
      if(currentDate[3] > date[3] || currentMonth > month || parseInt(currentDate[2]) > parseInt(date[2]) + 2 ) {
        this.addSessionStore();

      //If the current month and year is equal of the month in sessionStorage
      } if(currentDate[3] === date[3] && currentMonth === month) {
          // and the current day also the same
          if(currentDate[2] === date[2]  && parseInt(currentHours[0]) >= parseInt(hours[0]) + 2) {
            this.addSessionStore();
          }
          if(parseInt(currentDate[3]) === parseInt(date[3]) + 1 && parseInt(currentHours[0]) >= parseInt(hours[0]) + 24){
            this.addSessionStore();
          }
    } } else {
      this.addSessionStore();
    }
    this.setVisibility('hidden');
    this.vehicleEmite();
  }

  addSessionStore(): void {
    const date = Date();
    sessionStorage.setItem('vehicleList',JSON.stringify(this.listVehicle));
    sessionStorage.setItem('date', JSON.stringify(date));
  }


  setVisibility(hide): void {
    const btnVisibility = document.getElementsByClassName('submit-btn') as HTMLCollectionOf<HTMLElement>
    btnVisibility[0].style.visibility = hide;
  }


  vehicleEmite(): void {
    this.vehiclesEmitter.emit(this.listVehicle);
    this.listVehicle = [];
  }

}
