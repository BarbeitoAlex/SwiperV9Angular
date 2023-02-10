import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { ScriptService } from './script.service';

import { register } from 'swiper/element/bundle';

@Directive({
  selector: 'swiper-container',
})
export class SwiperDirective implements AfterViewInit {
  private readonly swiperElement: HTMLElement;
  private swiper!: Swiper;

  private readonly SWIPER_SCRIPT =
    'https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js';

  @Input() config!: SwiperOptions;

  loadedRegister = false;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly $script: ScriptService
  ) {
    this.swiperElement = el.nativeElement;
  }

  ngAfterViewInit() {
    this.$script.load(this.SWIPER_SCRIPT).then(() => {
      this.loadRegister();

      Object.assign(this.swiperElement, this.config);

      this.initListeners();

      // @ts-ignore
      this.swiperElement.initialize();
    });
  }

  initListeners() {
    this.swiperElement.addEventListener('init', ({ detail, target }: any) => {
      this.swiper = detail[0];
      console.log(this.swiper);
    });
  }

  loadRegister() {
    if (!this.loadedRegister) {
      register();
      this.loadedRegister = true;
    }
  }
}
