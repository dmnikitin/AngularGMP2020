import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BorderDirective } from './border.directive';
import { Course } from 'src/app/shared/models/course';
import { Colors } from 'src/assets/variables';
import { mockCourses } from 'src/assets/mock-data';

@Component({
  template: `
  <div [appBorder]="item.date"> Green border </div>
  <div appBorder="2021-11-09"> Blue border </div>
  <div appBorder="2017-12-03"> No border </div>
  <div appBorder> No border </div>
  <div id="no-directive"> No border </div>
  `
})
class TestComponent {
  public item: Course = mockCourses[1];
}

describe('BorderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elWithDirective: DebugElement[];
  let elWithoutDirective: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ BorderDirective, TestComponent ]
    })
      .createComponent(TestComponent);
    fixture.detectChanges();
    elWithDirective = fixture.debugElement.queryAll(By.directive(BorderDirective));
    elWithoutDirective = fixture.debugElement.query(By.css('#no-directive'));
  });

  it('should have three HTMLElements with applied directive', () => {
    expect(elWithDirective.length).toBe(4);
  });

  it('should change the border of element with directive and creation date 2weeks < current to green', () => {
    const borderColor: string = (elWithDirective[0].nativeElement as HTMLDivElement).style.borderColor;

    expect(borderColor).toBe(Colors.green);
  });

  it('should change the border of element with applied directive and upcoming creation date to blue', () => {
    const borderColor: string = (elWithDirective[1].nativeElement as HTMLDivElement).style.borderColor;

    expect(borderColor).toBe(Colors.blue);
  });

  it('should not change the border of element with directive and creation date 2weeks > current', () => {
    const borderColor: string = (elWithDirective[2].nativeElement as HTMLDivElement).style.borderColor;

    expect(borderColor).toBeFalsy();
  });

  it('should not change the border of element with directive and without input creation date', () => {
    const borderColor: string = (elWithDirective[3].nativeElement as HTMLDivElement).style.borderColor;

    expect(borderColor).toBeFalsy();
  });

  it('should not change the color of border of element without applied directive', () => {
    const borderColor: string = (elWithoutDirective.nativeElement as HTMLDivElement).style.borderColor;

    expect(borderColor).toBeFalsy();
  });
});
