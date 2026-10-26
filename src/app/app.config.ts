import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { SkillsPreloadingStrategy } from './services/skills-preloading.strategy';
import { provideClientHydration, withNoIncrementalHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(SkillsPreloadingStrategy)),
    provideClientHydration(withNoIncrementalHydration()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ]
};
