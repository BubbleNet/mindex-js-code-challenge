import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComponent } from './delete.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MatDialog,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
