import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { loadSwiper } from '../services/swiper-loader';

@Component({
    selector: 'app-degrees',
    imports: [],
    templateUrl: './degrees.component.html',
    styleUrl: './degrees.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DegreesComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      loadSwiper().catch(() => undefined);
    }
  }
}
