import { EmployeesService } from './employees.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'guiseek-store',
  templateUrl: './store.component.html',
  // styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  total$: Observable<number>;
  drivers$: Observable<number>;
  rosario$: Observable<number>;

  constructor(private service: EmployeesService) {}

  ngOnInit(): void {
    this.total$ = this.service.totalDrivers$;
    this.drivers$ = this.service.totalDrivers$;
    this.rosario$ = this.service.totalRosarioEmployees$;
  }
}
