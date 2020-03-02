import { Component, OnInit } from '@angular/core';
import { monthConst } from './../shared/months-const';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  vehicleList: IVehicles[] = [];

  header: string;
  title: string;
  constructor() { }

  ngOnInit() {
    this.header = 'ADMINISTRATION';
    this.title = 'VEHICLE';
    sessionStorage.clear();
  }

  vehicleEmite(vehicle: IVehicles[]) {
    this.vehicleList = vehicle;
  }
}
