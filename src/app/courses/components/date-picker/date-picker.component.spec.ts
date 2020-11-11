import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let mockData: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerComponent ],
      imports: [ FormsModule, SharedModule, NoopAnimationsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit string to parent component when onCreationDateChange is called', () => {
    spyOn(component.createdAtChange, 'emit');
    mockData = '12/10/2020';
    component.onCreationDateChange(mockData);

    expect(component.createdAtChange.emit).toHaveBeenCalledWith(mockData);
  });
});
