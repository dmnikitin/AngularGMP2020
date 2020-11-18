import { DebugElement, ElementRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CourseItemComponent } from './course-item.component';
import { ICourse } from 'src/app/shared/models/course';
import { BorderDirective } from 'src/app/courses/directives/border.directive';
import { DurationPipe } from 'src/app/courses/pipes/duration.pipe';
import { mockCourses } from 'src/assets/mock-data';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
  <app-course-item [item]="item" (deletedItemEvent)="handleDelete($event)"></app-course-item>`
})
class TestHostComponent {
  constructor() { }
  public item: ICourse = mockCourses[0];
  public deletedItemEvent: string;
  public handleDelete(itemId: string): void {
    this.deletedItemEvent = itemId;
  }
}

describe('CourseItemComponent TestHost tests', ()=>{
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, TestHostComponent, BorderDirective, DurationPipe ],
      imports: [NoopAnimationsModule]
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
      imports: [NoopAnimationsModule]
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
      declarations: [ CourseItemComponent, BorderDirective, DurationPipe ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    component = new CourseItemComponent();
    component.item = mockItem;
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
