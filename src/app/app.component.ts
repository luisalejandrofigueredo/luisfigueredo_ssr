import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationComponent } from "./navigation/navigation.component";
import { DarkModeService } from "./services/dark-mode.service";
import { DOCUMENT } from '@angular/common';

import { FullscreenOverlayContainer, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent, OverlayModule],
  providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'luisfigueredo_ssr';
  light_class = 'light-theme';
  dark_class = 'dark-theme';
  @HostBinding('class') className = 'light-theme';
  constructor(@Inject(DOCUMENT) private document: Document,private darkModeService: DarkModeService, private overlay: OverlayContainer) { }
  ngOnInit(): void {
    this.darkModeService.miEventoSubject.subscribe((changeTo) => {
      this.className = changeTo ? this.dark_class : this.light_class;
      if (changeTo === true) {
        this.overlay.getContainerElement().classList.add(this.dark_class);
        this.document.body.style.backgroundColor = "#1d1b1e";

      }
      else {
        this.overlay.getContainerElement().classList.add(this.light_class);
        this.overlay.getContainerElement().classList.remove(this.dark_class);
        this.document.body.style.backgroundColor = "#fffbff";
      }
    })
    if (typeof (this.document as any).defaultView.matchMedia !== 'undefined' &&
      (this.document as any).defaultView.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkModeService.ChangeColor(true);
    }
  }
  ngOnDestroy(): void {
    this.darkModeService.miEventoSubject.unsubscribe();
  }
}
