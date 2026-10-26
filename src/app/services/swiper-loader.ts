const SWIPER_CSS = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
const SWIPER_JS = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js';

let swiperPromise: Promise<void> | undefined;

export function loadSwiper(): Promise<void> {
  if (typeof document === 'undefined' || customElements.get('swiper-container')) {
    return Promise.resolve();
  }

  if (!swiperPromise) {
    swiperPromise = new Promise((resolve, reject) => {
      if (!document.querySelector('link[data-swiper]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = SWIPER_CSS;
        link.dataset['swiper'] = '';
        document.head.appendChild(link);
      }

      const existingScript = document.querySelector<HTMLScriptElement>('script[data-swiper]');
      if (existingScript?.dataset['swiperLoaded'] === 'true') {
        resolve();
        return;
      }

      const script = existingScript ?? document.createElement('script');
      if (!existingScript) {
        script.src = SWIPER_JS;
        script.dataset['swiper'] = '';
        script.async = true;
        document.body.appendChild(script);
      }

      script.addEventListener('load', () => {
        script.dataset['swiperLoaded'] = 'true';
        resolve();
      }, { once: true });
      script.addEventListener('error', () => reject(new Error('Failed to load Swiper')), { once: true });
    });
  }

  return swiperPromise;
}
