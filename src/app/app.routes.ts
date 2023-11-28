import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons',
    loadComponent: () =>
      import('./pokemons/feature/pokemon.component').then(
        (c) => c.PokemonComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'pokemons',
  },
];
