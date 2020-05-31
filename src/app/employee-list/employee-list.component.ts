import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {DeleteComponent} from '../delete/delete.component'
import {EditComponent} from '../edit/edit.component'
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  errorMessage: string;
  col: Number;

  constructor(
    private employeeService: EmployeeService,
    public deleteDialog: MatDialog,
    public editDialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map((emps: Employee[]) => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  deleteDirectReport(group): void {
    const deleteDialogRef = this.editDialog.open(DeleteComponent, {
      data: group.report
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      if(result){
        // Save the parent with the modified report list
        this.employeeService.save(group.employee).pipe(
          catchError(this.handleError.bind(this))
        ).subscribe(() => {
          this.ngOnInit();
        })
        // Delete the report
        this.employeeService.remove(result).pipe(
          catchError(this.handleError.bind(this))
        ).subscribe(() => {
          this.ngOnInit();
        });
      }
    })
  }
  
  editDirectReport(employee: Employee): void {
    const editDialogRef = this.editDialog.open( EditComponent, {
      data: employee
    });

    editDialogRef.afterClosed().subscribe((result: Employee) => {
      if (result){
        this.employeeService.save(result).pipe(
          catchError(this.handleError.bind(this))
        ).subscribe( (data) => {
            this.ngOnInit();
        });
      }
    })
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
