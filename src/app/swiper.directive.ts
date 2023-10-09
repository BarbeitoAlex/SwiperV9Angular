import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import Swiper from 'swiper';
// import { SwiperOptions } from 'swiper/types';
import { ScriptService } from './script.service';

import { register } from 'swiper/element/bundle';

import { isScullyRunning, isScullyGenerated } from '@scullyio/ng-lib';

@Directive({
  selector: 'swiper-container',
})
export class SwiperDirective implements AfterViewInit {
  private readonly swiperElement: HTMLElement;
  private swiper!: Swiper;

  private readonly SWIPER_SCRIPT =
    'https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js';

  @Input() config!: /*SwiperOptions*/ any;

  loadedRegister = false;

  @Output() onSwiper = new EventEmitter<Swiper>();

  isScullyRunning = false;
  isScullyGenerated = false;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly $script: ScriptService
  ) {
    this.isScullyRunning = isScullyRunning();
    this.isScullyGenerated = isScullyGenerated();
    this.swiperElement = el.nativeElement;
  }

  ngAfterViewInit() {
    if (this.isScullyRunning) this.createScullyPlaceholder();
    if (this.isScullyGenerated) this.generatedFromHTML();

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
      this.onSwiper.next(this.swiper);
      console.log(this.swiper);
    });
  }

  loadRegister() {
    if (!this.loadedRegister) {
      register();
      this.loadedRegister = true;
    }
  }

  createScullyPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.classList.add('scully-swiper-placeholder');
    const preload = document.createElement('div');
    preload.classList.add('swiper-lazy-preloader');
    placeholder.append(preload);
    this.swiperElement.append(placeholder);
    this.swiperElement.classList.add(
      'scully-swiper',
      'scully-swiper-isRunning'
    );
  }

  generatedFromHTML() {
    this.swiperElement.classList.add('scully-swiper');
    const slides = this.swiperElement.querySelectorAll('swiper-slide');
    slides.forEach((s) => s.classList.add('fade-in'));
  }
}
