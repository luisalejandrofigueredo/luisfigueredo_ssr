import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    OverlayModule,
    AsyncPipe,
  ]
})
export class NavigationComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  slide_toggle = new FormControl(false);
  light_class = 'theme-light';
  dark_class = 'theme-dark'
  @HostBinding('class') className = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private overlay: OverlayContainer, private darkModeService: DarkModeService) { 
    this.className='theme-light';
  }
  ngOnInit(): void {
    this.slide_toggle.valueChanges.subscribe((currentMode) => {
      this.darkModeService.ChangeColor(currentMode!);
    })
  }
  ngOnDestroy(): void {
    this.darkModeService.miEventoSubject.unsubscribe();
    
  }
}
