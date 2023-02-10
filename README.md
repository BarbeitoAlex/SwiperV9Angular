Project to test the integration of Swiper v9 with Angular.

In this swiper version the integration must be with the web-component.

To try more scenarios add the swiper rules in carousels in the *app.component.ts*. The rules as attibutes must be attached in *kebab-case* but with the custom directive (*swiper.directive.ts*) a attribute *config* with a *SwiperOption* works too.

To modify the scully placeholder sice use css rules and change the *--scullySwiperMinHeight* variable manually.

## Script 

**npm run start**: to start the Angular serve

**npm run build**: to build the Angular app.

**npm run scully**: to build the jamstack version.

**npm run scully:build**: do the Anuglar and Scully build.

**npm run scully:serve**: serve the actual static folder.

**npm run scully:watch**: updates the static folder and serve when the Angular is build.
