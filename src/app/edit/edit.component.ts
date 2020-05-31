import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Employee } from '../employee';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent{
  employeeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) { }

  ngOnInit(){
    this.employeeForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      position: new FormControl(),
      compensation: new FormControl(),
    })
    this.employeeForm.patchValue(this.data);
  }

  submit(){
    this.data.compensation = this.employeeForm.get('compensation').value;
    this.data.firstName = this.employeeForm.get('firstName').value;
    this.data.lastName = this.employeeForm.get('lastName').value;
    this.data.position = this.employeeForm.get('position').value;
    this.dialogRef.close(this.data);
  }

  cancel(){
    this.dialogRef.close();
  }
}
