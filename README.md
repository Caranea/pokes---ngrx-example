# Pokemons

## Project structure

I organized code in a feature-based structure, based on UI and project functionalities (or, like now, only one functionality). If we were to have more features, we have a shared folder for code we need to reuse across the application.

Inside the main features, we have several additional layers. In /feature and /ui live respectively smart and representational angular components. /Data-access contains files allowing communication with the backend. /Store is the heart of the application and contains the ngrx store, which we rely heavily on. Finally, our data structures live in /models folders.

## Data mapping 

I started with mapping out the data we get from poke API and planning the object structure I need to create from it. It lives in pokemon.model.ts. Some inconsistencies in API reflect in the application- for example when searching by color, pokeAPI returns species instead of pokemons which have different structure I needed to display. Note: PokeApi doesn't provide pagination in their by color endpoint, hence the app displays all species at once. 

## Store and caching

I used the ngrx library to manage the application state. This allows us to offload most of the logic from components which only have to worry about dispatching actions and managing data from the store, which would prove very useful once we start implementing more features, it serves as a cache mechanism. A service will make the API call only if the data is not found in the store. I implemented saving the data in the local storage for data persistence.

Note: due to limited time, I didn't implement "getting a single species detail" in a store. Hence it doesn't cache.
Note: Certain collections, for example, pokemon with details, are arrays of objects that in theory could get quite big over time. If I wasn't constrained by time, I'd change them to objects with keys to access elements, to avoid time-consuming array searching to improve performance.

## Shared functionalities

I extracted the modal and search-form from the Pokemon feature to a shared folder. While so far they miss a lot in terms of being general components and are still quite specific, it's a start toward them being reusable across the app. Especially form component especially needs a lot of proper rework. In the modal component, separate display directives need extracting as well, to make the reusable and remove the clutter. 

## Error handling 

I prepared an error serving mechanism internally, that will be especially useful with HTTP errors. A property in store can be set with information about loading status, or its error. It's not implemented in UI yet, due to time constraints, but I see it implemented in a global toastr service after it's extracted out of the Pokemon store to a general one. 

## Animations

I animated certain parts of the view using a builtin angular animation module

## Styling 

I used SCSS for styling files. I tried to keep reusable rules in the main file while keeping component-specific ones in their respective folders. For the layout, I used a mixture of grid and flexbox.

## Project management tools

As a final touch, I used eslint and prettier to format and lint my code.

## Final notes

Some of the libraries I used are not fully compatible with v17. When installing dependencies, using -f might be necessary.

## Tests 

Due to time constraints, application is not tested yet. In real life example, writing tests for data heavy functionalities, like pokemont.component, would be crucial.


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
