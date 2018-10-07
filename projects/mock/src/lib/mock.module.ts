import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from './mock.interceptor';
import { MOCK_CONFIG, WpMockConfig } from './mock.token';

@NgModule({
  imports: [HttpClientModule]
})
export class WordPressMockModule {
  static forRoot(config: WpMockConfig): ModuleWithProviders {
    return {
      ngModule: WordPressMockModule,
      providers: [
        {
          provide: MOCK_CONFIG,
          useValue: config
        },
        fakeBackendProvider
      ]
    };
  }
}
