import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'ng-gd', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender },
];
