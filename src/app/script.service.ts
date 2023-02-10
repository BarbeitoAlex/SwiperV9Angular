import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, take } from 'rxjs';

interface ScriptLoaderStatus {
  status$: BehaviorSubject<'loading' | 'loaded'>;
}

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  private scripts: {
    [script: string]: ScriptLoaderStatus;
  } = {};

  constructor() {}

  load(...scripts: string[]) {
    var promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (this.scripts[scriptUrl]?.status$.value === 'loaded') {
        resolve({ script: scriptUrl, loaded: true, status: 'Already Loaded' });
      } else if (this.scripts[scriptUrl]?.status$.value == 'loading') {
        this.scripts[scriptUrl].status$
          .pipe(
            filter((s) => s === 'loaded'),
            take(1)
          )
          .subscribe(() => {
            resolve({ script: scriptUrl, loaded: true, status: 'Loaded' });
          });
      } else {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptUrl;
        //
        this.scripts;
        this.scripts[scriptUrl] = {
          status$: new BehaviorSubject<'loading' | 'loaded'>('loading'),
        };
        //
        script.onload = () => {
          this.scripts[scriptUrl].status$.next('loaded');
          resolve({ script: script, loaded: true, status: 'Loaded' });
        };
        script.onerror = (error: any) =>
          resolve({ script: script, loaded: false, status: 'Loading Error' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }
}
