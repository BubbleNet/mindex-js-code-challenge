import {Component, Input, Output, EventEmitter} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {catchError} from 'rxjs/operators';
import {Employee} from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Output() deleteReport: EventEmitter<any> = new EventEmitter();
  @Output() editReport: EventEmitter<any> = new EventEmitter();
  @Input() employee: Employee;
  errorMessage: string;
  reports: Employee[] = [];
  directReports: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(){
    this.getReports(this.employee, true);
  }

  edit(employee: Employee): void {
    this.editReport.emit(employee);
  }

  delete(report: Employee): void {
    this.employee.directReports.forEach((value: Number) => {
      if (value == report.id) 
      this.employee.directReports = this.employee.directReports.filter(report => report != value)
    })
    this.deleteReport.emit({report: report, employee: this.employee});
  }

  getReports(employee: Employee, direct: boolean): void{
    if (employee.directReports){
      employee.directReports.forEach( (e) => {
        this.employeeService.get(e).pipe(
          catchError(this.handleError.bind(this))
        ).subscribe(emp=> {
          this.getReports(emp, false);
          this.reports.push(emp);
          if (direct) this.directReports.push(emp);
        });
      })
    }
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}