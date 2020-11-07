import { Injectable } from '@angular/core';
import { StateStore, StoreConfig } from '@nx-state/store';
import { EmployeesPage } from './employees-page';

@Injectable({ providedIn: 'root' })
@StoreConfig({
  store: 'employee',
  // prod: true
})
export class EmployeesPageStore extends StateStore<EmployeesPage> {
  constructor() {
    super({
      loading: true,
      employees: [],
      totalDrivers: 0,
      totalEmployees: 0,
      totalRosarioEmployees: 0,
    });
  }
}
