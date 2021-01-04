import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILanguage } from 'src/app/shared/models/language';

export const languagesToken: InjectionToken<ILanguage[]> = new InjectionToken<ILanguage[]>('languages');

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public currentLanguage: BehaviorSubject<ILanguage> = new BehaviorSubject(this.languages[0]);

  constructor(@Inject(languagesToken) private readonly languages: ILanguage[]) {
    this.setCurrentLanguage();
  }

  public setCurrentLanguage(): void {
    const lsLanguage: string = localStorage.getItem('language');
    const language: ILanguage = this.languages.find(lang => lang.name === lsLanguage);
    this.currentLanguage.next(language);
  }
}
