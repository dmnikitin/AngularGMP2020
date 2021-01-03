import { AfterContentInit, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {

  constructor(private translateService: TranslateService) {

    translateService.addLangs(['en', 'ru']);
    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  public ngOnInit(): void {
    console.log('init');
    // this.translateService.setDefaultLang(lang);
    //   this.translateService.use(lang);

  }

  public ngAfterContentInit(): void {
  }
}
