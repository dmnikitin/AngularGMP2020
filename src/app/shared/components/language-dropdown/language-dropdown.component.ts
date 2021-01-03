import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';
import { ILanguage } from 'src/app/shared/models/language';
import { languages } from 'src/assets/variables';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss']
})
export class LanguageDropdownComponent implements OnInit {

  public selected$: Subject<ILanguage>;
  public languages: ILanguage[];
  public displayedLanguages: ILanguage[];
  public isDropdownOpen: boolean = false;

  constructor(private translate: TranslateService, private languageService: LanguageService) { }

  public ngOnInit(): void {
    this.languages = languages;
    this.displayedLanguages = this.filterLanguages(1);
    this.selected$ = this.languageService.currentLanguage;
  }

  public setLanguage(language: ILanguage): void {
    this.translate.use(language.name);
    const selectedLang: ILanguage = this.languages.find(lang => lang.id === language.id);
    this.displayedLanguages = this.filterLanguages(language.id);
    this.languageService.currentLanguage.next(selectedLang);
    this.isDropdownOpen = false;
  }

  private filterLanguages(selectedId: number): ILanguage[] {
    return this.languages.filter(lang => lang.id !== selectedId);
  }
}
