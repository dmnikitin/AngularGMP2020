import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private translateService: TranslateService) {}

  public ngOnInit(): void {
    this.setDefaultLanguage();

  }

  private setDefaultLanguage(): void {
    const lsLanguageValue: string = localStorage.getItem('language');
    if (!lsLanguageValue) {
      localStorage.setItem('language', environment.defaultLocale);
    }
    this.translateService.setDefaultLang(environment.defaultLocale);
    this.translateService.use(lsLanguageValue || environment.defaultLocale);
  }
}
