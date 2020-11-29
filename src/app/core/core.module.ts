import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiCallInterceptor } from './interceptors/api-call.interceptor';
@NgModule({
  imports: [
    HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiCallInterceptor, multi: true }
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
