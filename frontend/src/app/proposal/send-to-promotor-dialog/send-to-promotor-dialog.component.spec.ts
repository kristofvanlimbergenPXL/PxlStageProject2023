import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToPromotorDialogComponent } from './send-to-promotor-dialog.component';

describe('SendToPromotorDialogComponent', () => {
  let component: SendToPromotorDialogComponent;
  let fixture: ComponentFixture<SendToPromotorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendToPromotorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendToPromotorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
