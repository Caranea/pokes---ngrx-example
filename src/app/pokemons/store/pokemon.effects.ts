import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  IPokemon,
  IPokemonResponse,
  ISpecie,
  Pokemon,
} from '../models/pokemon.model';
import { catchError, combineLatest, exhaustMap, map, of } from 'rxjs';
import {
  getCachedPokemonSuccess,
  getCachedSpeciesSuccess,
  getPokemon,
  getPokemonSuccess,
  getPokemons,
  getPokemonsFailure,
  getPokemonsSuccess,
  getSpecies,
  getSpeciesSuccess,
} from './pokemon.actions';

import { PokemonFacade } from './pokemon.facade';
import { PokemonService } from '../data-access/pokemon.service';
import { inject } from '@angular/core';

export class pokemonEffects {
  private readonly actions$ = inject(Actions);
  private readonly pokemonService = inject(PokemonService);
  private readonly pokemonFacade = inject(PokemonFacade);
  private readonly currentOffset$ = this.pokemonFacade.currentOffset$;
  private readonly detailedPokemons$ = this.pokemonFacade.detailedPokemons$;
  private readonly species$ = this.pokemonFacade.species$;

  pokemons$ = createEffect(() =>
    combineLatest([
      this.currentOffset$,
      this.actions$.pipe(ofType(getPokemons)),
    ]).pipe(
      exhaustMap((result) => {
        const currentOffset = result[0];
        return this.pokemonService.getPokemons(currentOffset, 10).pipe(
          map((result) => {
            const pokemons: IPokemon[] = [];
            (result as any).results.forEach((pokemon: any) => {
              pokemons.push({
                name: pokemon.name as string,
                urlData: {
                  label: 'url',
                  uiDisplay: false,
                  value: pokemon.url,
                },
              });
            });
            return getPokemonsSuccess({ pokemons });
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
      })
    )
  );

  $pokemon = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(getPokemon)),
      this.detailedPokemons$,
    ]).pipe(
      exhaustMap((result) => {
        const url = result[0].url;
        const detailedPokemons = result[1];
        const cachedPokemon = detailedPokemons?.find(
          (pokemon: IPokemon) => pokemon.urlData.url === url
        );

        if (cachedPokemon) {
          return of(getCachedPokemonSuccess({ pokemon: cachedPokemon }));
        }

        const service = result[0].byName
          ? this.pokemonService.searchByName(url)
          : this.pokemonService.getPokemon(url);

        return service.pipe(
          map((result) => {
            console.log(result);
            const pokemon = new Pokemon(result as IPokemonResponse, url);
            return getPokemonSuccess({ pokemon });
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
      })
    )
  );

  $species = createEffect(() =>
    combineLatest([this.actions$.pipe(ofType(getSpecies)), this.species$]).pipe(
      exhaustMap((result) => {
        const color = result[0].color;
        const cachedSpecies = result[1][color];

        if (cachedSpecies) {
          return of(
            getCachedSpeciesSuccess({ species: cachedSpecies, color: color })
          );
        }

        return this.pokemonService.searchByColor(color).pipe(
          map((result: any) => {
            const species: ISpecie[] = [];
            (result as any).pokemon_species.forEach((specie: any) => {
              species.push({
                name: specie.name as string,
                urlData: {
                  label: 'url',
                  uiDisplay: false,
                  value: specie.url,
                },
              });
            });
            return getSpeciesSuccess({ species, color: color });
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
      })
    )
  );
}
