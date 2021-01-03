import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILanguage } from 'src/app/shared/models/language';
import { languages } from 'src/assets/variables';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss']
})
export class LanguageDropdownComponent implements OnInit {

  public selected: ILanguage;
  public languages: ILanguage[];
  public isDropdownOpen: boolean = false;

  constructor(private translate: TranslateService) { }

  public ngOnInit(): void {
    console.log(this.translate);
    this.languages = languages;
    this.selected = this.languages[0];
  }

  public setLanguage(language: string): void {
    this.translate.use(language);
    this.selected = this.languages.find(lang => lang.name === language);
    this.isDropdownOpen = false;
  }

}
