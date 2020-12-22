import { userReducer } from './store/reducers/user.reducer';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiCallInterceptor } from './interceptors/api-call.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoursesEffects } from './store/effects/courses.effect';
import { coursesReducer } from './store/reducers/courses.reducer';
import { UserEffects } from './store/effects/user.effects';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot({ courses: coursesReducer, user: userReducer }),
    EffectsModule.forRoot([CoursesEffects, UserEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiCallInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded'
      );
    }
  }
}
