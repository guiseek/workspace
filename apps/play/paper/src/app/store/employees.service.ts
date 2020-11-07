import { Injectable } from '@angular/core';
import { EmployeesPageStore } from './state/employees-page.store';
// import { EmployeeFirestore } from './employee.firestore';
import { Observable, combineLatest, timer } from 'rxjs';
import { Employee } from './state/models/employee';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private store: EmployeesPageStore) {
    timer(2000).subscribe(({ employees = [] }: any = { employees: [] }) => {
      this.store.patch(
        {
          loading: false,
          employees,
          totalEmployees: employees.length,
          totalDrivers: employees.filter(
            (employee) => employee.hasDriverLicense
          ).length,
          totalRosarioEmployees: employees.filter(
            (employee) => employee.location === 'Rosario'
          ).length,
        },
        `employees collection subscription`
      );
    });
  }

  get employees$(): Observable<Employee[]> {
    return this.store.state$.pipe(
      map((state) => (state.loading ? [] : state.employees))
    );
  }

  get filter$() {
    return this.store.state$.pipe(map((state) => state.filter));
  }

  get fileredEmployees$(): Observable<Employee[]> {
    return combineLatest([this.employees$, this.filter$]).pipe(
      map(([employees, filter]) => {
        return employees.filter((employee) => {
          return employee.name === filter.name;
        });
      })
    );
  }

  get loading$(): Observable<boolean> {
    return this.store.state$.pipe(map((state) => state.loading));
  }

  get noResults$(): Observable<boolean> {
    return this.store.state$.pipe(
      map((state) => {
        return (
          !state.loading && state.employees && state.employees.length === 0
        );
      })
    );
  }

  get formStatus$(): Observable<string> {
    return this.store.state$.pipe(map((state) => state.formStatus));
  }

  get totalEmployees$(): Observable<number> {
    return this.store.state$.pipe(map((state) => state.totalEmployees));
  }

  get totalDrivers$(): Observable<number> {
    return this.store.state$.pipe(map((state) => state.totalDrivers));
  }

  get totalRosarioEmployees$(): Observable<number> {
    return this.store.state$.pipe(map((state) => state.totalRosarioEmployees));
  }
}
