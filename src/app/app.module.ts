import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {AppComponent} from './app.component';
import {BackendlessMockService} from './backendless-mock.service';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeService} from './employee.service';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeListComponent,
    DeleteComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(BackendlessMockService, {
      apiBase: 'api/',
      delay: 250,
      passThruUnknownUrl: true,
      post204: false,
      put204: false
    }),
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
