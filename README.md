# Pokemons

## Project structure

I organized code in a feature-based structure, based on UI and project functionalities (or, like now, only one functionality). If we were to have more features, we have shared folder for code we need to reuse across the application.

Inside main features, we have several additional layers. In /feature and /ui live respectively smart and representational angular components. /Data-access contains files allowing communication with the backend. /Store is the heart of the application and contains ngrx store, which we rely heavily on. Finally, our data structures live in /models folders.

## Data mapping 

I started with mapping out the data we get from poke API and planning the object structure I need create from it. It lives in pokemon.model.ts. So inconsintencies in API reflect in the application- for example, when searching by color, pokeAPI returns species instead of pokemons which have difficult data I needed to display.

## Store and caching

I used ngrx library to manage application state. This allows to offload most of the logic from components whcih only have to worry about displatching actions and managing data from the store, which would prove very useful once we'd start implementing more features, plus it serves as cache mechanism, as I implemented saving the data in the local storage. A service will make the API call only if the data was not found in the store. 

Note: due to limited time, I didn't implement "getting a single specie detail" in a store. Hence it doesn't cache.
Note: Certain collections, for example pokemons with details, are arrays of object that in theory could get quite big over time. If I wasn't constrainted by time, I'd change them to object with keys to access elements, to avoid time consuming array searching to improve performance.

## Shared functionalities

I extracted modal and search-form from pokemon feature to shared folder. While so far they miss a lot in terms of being general component, and are still quite specific, it's a start toward them being reusable across the app. Especially form component needs a lot of proper rework. In modal component, separate display directives need extracting as well, to make the reusable and remove the clutter. 

## Error handling 

I prepared an error serving mechanism internally, that will be especially useful with http errors. A property in store can be set with information about loading status, or its error. It's not implement in ui yet, due to time constraints, but I see it implemented in a global toastr service, after it's extracted out of pokemon store to a general one. 

## Animations

I animated certain parts of the view using builtin angular animation module

## Styling 

I used SCSS for styling files. I tried to keep reusable rules in the main file while keeping component-specific ones in their respective folders. For layout, I used a mixture of grid and flexbox.

## Project management tools

As a final touches, I used eslint and prettier to catch format and lint my code.

## Final notes

Some of the libraries I used are not fully compatible with v17. When instaling dependencies, using -f might be necessary.

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
