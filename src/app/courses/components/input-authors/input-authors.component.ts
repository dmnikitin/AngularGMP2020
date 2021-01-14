import {
  Component,
  Input,
  forwardRef
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthorsService } from 'src/app/core/services/authors.service';
import { IAuthors } from 'src/app/shared/models/course';

@Component({
  selector: 'app-input-authors',
  templateUrl: './input-authors.component.html',
  styleUrls: ['./input-authors.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAuthorsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputAuthorsComponent),
      multi: true
    }
  ]
})
export class InputAuthorsComponent implements Validator, ControlValueAccessor {

  @Input() public parent: FormGroup;
  public isDropdownOpen: BehaviorSubject<boolean> = this.authorsService.dropdownOpen;
  public checkedAuthors: IAuthors[] = [];
  public displayedAuthors: IAuthors[];

  constructor(private authorsService: AuthorsService) { }

  public onChange: (value: IAuthors[]) => void;
  public onTouched: (value: IAuthors[]) => void;

  public writeValue(): void {
    const value: IAuthors[] = this.parent.get('authors').value as IAuthors[];
    if (value.length) {
      value.forEach(author => {
        this.checkedAuthors.push(this.convertFetchedAuthors(author));
      });
    }
  }

  public registerOnChange(fn: (val: IAuthors[]) => unknown): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: (val: IAuthors[]) => unknown): void {
    this.onTouched = fn;
  }

  public onSelectAuthor(value: IAuthors): void {
    this.checkedAuthors.push(value);
    this.authorsService.dropdownOpen.next(false);
    this.onChange(this.checkedAuthors);
  }

  public onDelete(value: string): void {
    this.checkedAuthors = this.checkedAuthors.filter((author) => author.id !== value);
    this.onChange(this.checkedAuthors);
  }

  public onInput(value: string): void {
    this.authorsService.dropdownOpen.next(true);
    this.authorsService.getAuthors(value).pipe(take(1)).subscribe(fetchedAuthors=>{
      this.displayedAuthors = fetchedAuthors.filter(fetched => {
        if (!this.checkedAuthors.some(checked=> fetched.id === checked.id)) {
          return fetched.id;
        }
      });
    });
  }

  private convertFetchedAuthors(author: {id: string; name: string; lastName?: string}): IAuthors {
    if (author.lastName) {
      return { id: author.id, name: `${author.name} ${author.lastName}`};
    }
    return author;
  }

  public validate(control: AbstractControl): {[key: string]: boolean} | null {
    if (!(control.value as FormArray).length) {
      return { authorsIsInvalid: true };
    }
    return null;
  }
}
