import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from './mock.interceptor';

@NgModule({
  imports: [HttpClientModule]
})
export class WordpressMockModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WordpressMockModule,
      providers: [fakeBackendProvider]
    };
  }
}
