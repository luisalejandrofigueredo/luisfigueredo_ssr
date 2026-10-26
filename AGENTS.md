# AGENTS.md

## Project

Single Angular 22.2 standalone app (no NgModules) with SSR + prerendering. The Angular project is `luisfigueredo_ssr` (see `angular.json`); build output goes to `dist/luisfigueredo_ssr`. Static assets live in `public/` and are referenced by bare filename (`Angular.svg`), not `/assets/...`.

New components are standalone, prefixed `app`, and generated with SCSS (`angular.json` schematic).

Angular 22 requires Node `^22.22.3 || ^24.15.0 || >=26`; this workspace runs Node 24.

The app still uses zone.js (`provideZoneChangeDetection` in `src/app/app.config.ts`); it is not a zoneless app even though Angular 22 templates default to zoneless.

## Commands

- Dev server: `npm start` (`http://localhost:4200`)
- Production build: `npm run build` (prerenders 5 routes, ~14-16s)
- Serve built SSR app: `npm run build && npm run serve:ssr:luisfigueredo_ssr` (listens on `PORT`, default `4000`)
- Tests: `npm test -- --watch=false` (Vitest + jsdom; currently 11/11 pass)
- Single spec: `npm test -- --watch=false --include src/app/about/about.component.spec.ts`
- Browser tests: add `--browsers=ChromeHeadless`; otherwise Vitest runs in Node/jsdom.
- No lint/format/typecheck scripts. `.editorconfig` is the only style config: 2 spaces, single quotes in `.ts`.

## Current gotchas

- SSR host validation is enabled. `angular.json` allows `localhost` and `127.0.0.1` for local runs. For production, set `NG_ALLOWED_HOSTS` (comma-separated) or add the real hostnames to `projects.luisfigueredo_ssr.architect.build.options.security.allowedHosts`. Without that, the SSR server returns 400 Bad Request.
- Material Icons is loaded from Google Fonts with a `text=` subset for only the ligatures used in the app. If you add a new `<mat-icon>` ligature, extend that query parameter in `src/index.html` or the glyph will render as text.
- `TableSkillsComponent` assigns its `TableSkillsDataSource` in `ngAfterViewInit`. It must call `ChangeDetectorRef.detectChanges()` right after `table.dataSource = ...`; without it, client-side navigation to `/skills` renders the header and paginator but no data rows (`TableSkillsDataSource.connect()` is never reached).
- Do not use `waitForAsync` in specs. With Vitest + zone.js it throws `Expected to be running in 'ProxyZone', but it was not found.` Use `async`/`await` with `TestBed.compileComponents()` instead.
- `NgGdComponent` is browser-only. Its spec provides `PLATFORM_ID: 'server'` to skip canvas initialization in jsdom; do not remove that without mocking a 2D canvas context.
- `NgGdComponent.ngOnInit` must stay guarded with `isPlatformBrowser(inject(PLATFORM_ID))`, otherwise `/ng-gd` fails during prerender.
- The initial production bundle is ~838 kB raw / ~166 kB estimated transfer. Budgets are 1.5 MB warning / 2 MB error; component styles are 4 kB / 8 kB. `/skills` lazy-loads a ~164 kB `TableSkillsComponent` chunk, then preloads it after 2s on other routes.
- Route `/skills` renders `TableSkillsComponent`; `SkillsComponent` (the Swiper carousel) is not routed. All routes are in `src/app/app.routes.ts` and use `loadComponent`; each route's `data.state` drives the page transition animation (`provideAnimationsAsync`, so the animation engine is a lazy chunk on first load). The `skills` route also sets `data.preload`, consumed by `SkillsPreloadingStrategy` (2s delay) so client-side navigation to `/skills` does not wait for the lazy chunk.

## Architecture notes

- SSR entry is `src/server.ts`: Express 5 + `AngularNodeAppEngine`, serving the `browser/` bundle and Angular renders. `compression()` runs before `express.static`. It exports `reqHandler` (`createNodeRequestHandler`), not `app()`. Use Express 5 route syntax (for example `/api/{*splat}`).
- `src/app/app.routes.server.ts` controls render modes: `ng-gd` is `RenderMode.Client`; `**` is `RenderMode.Prerender`. This is why only 5 routes are static and `/ng-gd` is served as a CSR shell.
- Client/server configs are split between `src/app/app.config.ts` and `src/app/app.config.server.ts`; the server config uses `provideServerRendering(withRoutes(serverRoutes))`.
- Swiper 11 is loaded dynamically from a CDN by `src/app/services/swiper-loader.ts`; `DegreesComponent` and `SkillsComponent` call `loadSwiper()` only in the browser. Components using `<swiper-*>` declare `CUSTOM_ELEMENTS_SCHEMA`. Do not add an npm Swiper dependency or put the CDN tags back in `src/index.html`.
- Table data is static in `src/app/table-skills/table-skills-datasource.ts`; there is no HTTP request or backend for `/skills`.
- Table images use WebP variants in `public/` (`typescript-logo.webp`, `typeorm.webp`, `handlebars_logo.webp`, `express.webp`) and `loading="lazy"`/`decoding="async"`. The original PNGs are retained but no longer referenced; prefer WebP for new large images.
- Theming is split across `m3-theme.scss` and `src/styles.scss`. `styles.scss` applies the dark theme to `:root`; `AppComponent` toggles `light-theme`/`dark-theme` on `<app-root>` and the CDK overlay container. `NavigationComponent` still uses the stale `theme-light`/`theme-dark` names.
- Dark mode is broadcast through the `Subject` in `DarkModeService`. Both `AppComponent` and `NavigationComponent` unsubscribe that shared Subject in `ngOnDestroy`, which can permanently close it; be careful when adding subscribers.
