import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';

import { ApplicationConfig } from '@angular/core';
import { PokemonFacade } from './pokemons/store/pokemon.facade';
import { PokemonService } from './pokemons/data-access/pokemon.service';
import { isDevMode } from '@angular/core';
import { localStorageSync } from 'ngrx-store-localstorage';
import { pokemonEffects } from './pokemons/store/pokemon.effects';
import { pokemonReducer } from './pokemons/store/pokemon.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';

function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['pokemons'] })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ pokemons: pokemonReducer }, { metaReducers }),
    provideEffects(pokemonEffects),
    provideHttpClient(),
    provideAnimations(),
    PokemonService,
    PokemonFacade,
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
