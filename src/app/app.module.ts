import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { languagesToken } from './core/services/language.service';
import { dataLanguages } from 'src/assets/variables';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    AuthModule
  ],
  providers: [{
    provide: languagesToken,
    useValue: [...dataLanguages]
  }],
  bootstrap: [
    AppComponent
  ]

})
export class AppModule { }
