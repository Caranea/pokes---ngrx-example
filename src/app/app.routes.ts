import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pokemons/feature/pokemon.component').then(
        c => c.PokemonComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'pokemons',
  },
];
