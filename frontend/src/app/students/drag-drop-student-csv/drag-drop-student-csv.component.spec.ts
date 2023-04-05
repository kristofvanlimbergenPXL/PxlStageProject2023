import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropStudentCsvComponent } from './drag-drop-student-csv.component';

describe('DragDropStudentCsvComponent', () => {
  let component: DragDropStudentCsvComponent;
  let fixture: ComponentFixture<DragDropStudentCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropStudentCsvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropStudentCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
