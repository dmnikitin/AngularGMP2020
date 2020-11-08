import { DebugElement, ElementRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';
import { CourseItemComponent } from './course-item.component';
import { ICourse } from 'src/app/shared/models/course';
import { BorderDirective } from 'src/app/courses/directives/border.directive';
import { DurationPipe } from 'src/app/courses/pipes/duration.pipe';
import { mockCourses } from 'src/assets/mock-data';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
  <app-course-item [item]="item" (deletedItemEvent)="handleDelete($event)"></app-course-item>`
})
class TestHostComponent {
  constructor(private dialog: MatDialog) { }
  public item: ICourse = mockCourses[0];
  public deletedItemEvent: string;
  public handleDelete(itemId: string): void {
    const dialogRef: MatDialogRef<DeleteModalComponent> = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletedItemEvent = itemId;
      } else {
        this.deletedItemEvent = '';
      }
    });
  }
}
type DialogRefStubFunc = { afterClosed: () => Observable<boolean> };
type DialogStubFunc = { open: () => DialogRefStubFunc };

const dialogRefStub: DialogRefStubFunc = {
  afterClosed: () => of(true)
};
const dialogStub: DialogStubFunc= { open: () => dialogRefStub };

describe('CourseItemComponent TestHost tests', ()=>{
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, TestHostComponent, BorderDirective, DurationPipe ],
      imports: [MatDialogModule, NoopAnimationsModule],
      providers: [{ provide: MatDialog, useValue: dialogStub }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create testHost component', () => {
    expect(testHost).toBeTruthy();
  });

  it('should update the deletedItem property when handleDelete method is called', () => {
    button = (fixture.nativeElement as HTMLElement).querySelector('.delete');
    button.click();
    fixture.detectChanges();

    expect(testHost.deletedItemEvent).toBe(testHost.item.id);
  });

  it('should not update the deletedItem property if Delete button in dialog was not clicked', () => {
    dialogRefStub.afterClosed = () => of(false);
    button = (fixture.nativeElement as HTMLElement).querySelector('.delete');
    button.click();
    fixture.detectChanges();

    expect(testHost.deletedItemEvent).toBeUndefined();
  });

  afterEach(()=>{
    dialogRefStub.afterClosed = () => of(true);
  });
});

describe('CourseItemComponent Standalone tests', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let debugElement: DebugElement;
  let button: ElementRef;
  const mockItem: ICourse = mockCourses[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, BorderDirective, DurationPipe ],
      imports: [MatDialogModule, NoopAnimationsModule],
      providers: [{ provide: MatDialog, useValue: dialogStub }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.item = mockItem;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create standalone component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit itemId to the parent component when handleDelete method is called', () => {
    spyOn(component.deletedItemEvent, 'emit');
    button = debugElement.query(By.css('.delete'));
    (button.nativeElement as HTMLButtonElement).click();

    expect(component.deletedItemEvent.emit).toHaveBeenCalledWith(mockItem.id);
  });
});

describe('CourseItemComponent Class tests', ()=>{
  let component: CourseItemComponent;
  const mockItem: ICourse = mockCourses[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, BorderDirective, DurationPipe ],
      providers: [{ provide: MatDialog, useValue: dialogStub }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    const dialog: MatDialog = TestBed.inject(MatDialog);
    component = new CourseItemComponent(dialog);
    component.item = mockItem;
    spyOn(dialog, 'open').and.returnValue(dialogRefStub as MatDialogRef<DeleteModalComponent>);

  });

  it('should create new instance of CourseItemComponent from class', () => {
    expect(component).toBeTruthy();
  });

  it('should raise the deletedItem event when item is deleted', () => {
    component.deletedItemEvent.subscribe((id: string) => {
      expect(id).toBe(component.item.id);
    });
    component.handleDelete(component.item.id);
  });
});
