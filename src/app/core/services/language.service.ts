import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILanguage } from 'src/app/shared/models/language';
import { languages } from 'src/assets/variables';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public currentLanguage: BehaviorSubject<ILanguage> = new BehaviorSubject(languages[0]);
  constructor() { }
}
