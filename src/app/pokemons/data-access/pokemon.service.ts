import { catchError, map, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { getPokemonsFailure } from '../store/pokemon.actions';
import { inject } from '@angular/core';

export const urls = {
  base: 'https://pokeapi.co/api/v2/',
  getPokemons: (offset: number, limit: number) => {
    return `pokemon?offset=${offset}&limit=${limit}`;
  },
  pokemonsByName: (name: string) => {
    return `pokemon/${name}`;
  },
};

export class PokemonService {
  private readonly http: HttpClient = inject(HttpClient);

  getPokemons(offset: number, limit: number) {
    return this.http.get(urls.base + urls.getPokemons(offset, limit)).pipe(
      map((result) => {
        return result;
      })
    );
  }

  getPokemon(url: string) {
    return this.http.get(url).pipe(
      map((result) => {
        return result;
      })
    );
  }

  searchByName(name: string) {
    return this.http.get(urls.base + 'pokemon/' + name).pipe(
      map((result) => {
        return result;
      })
    );
  }

  searchByColor(color: string) {
    return this.http.get(urls.base + 'pokemon-color/' + color).pipe(
      map((result) => {
        return result;
      }),
      catchError((error) =>
        of(
          getPokemonsFailure({
            message: error.message,
            status: error.status,
          })
        )
      )
    );
  }

  getSpecie(url: string) {
    return this.http.get(url).pipe(
      map((result) => {
        return result;
      })
    );
  }
}
