import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injector, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { APP_INITIALIZER } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { map } from 'rxjs/operators';

export function appInitializerFactory(translate: TranslateService, http: HttpClient) {
  return async () => {

    try {
      translate.addLangs(['en', 'ru']);
      translate.setDefaultLang('en');

      const x = await translate.use('en').toPromise();
      console.log( x);
      return x;
    } catch (err) {
      console.log('🚀 ~ file: app.module.ts ~ line 25 ~ return ~ err', err);
      return { a: 1};

    }
  };
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,

    // TranslateModule.forRoot()
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
      // useDefaultLang: false,
      // isolate: true
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, HttpClient],
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]

})
export class AppModule { }
