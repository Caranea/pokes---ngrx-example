import { getPokemon, getPokemons, getSpecies } from './pokemon.actions';
import {
  selectCurrentOffset,
  selectDetailedPokemons,
  selectPokemons,
  selectSelectedPokemon,
  selectSpecies,
  selectSpeciesByColor,
  selectStatus,
} from './pokemon.selectors';

import { IAppState } from './pokemon.state';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';

export class PokemonFacade {
  private readonly store: Store<IAppState> = inject(Store);

  getPokemons(): void {
    this.store.dispatch(getPokemons());
  }

  getPokemon(url: string, byName = false): void {
    this.store.dispatch(getPokemon({ url, byName }));
  }

  getSpecies(color: string): void {
    this.store.dispatch(getSpecies({ color }));
  }

  currentOffset$ = this.store.select(selectCurrentOffset);
  detailedPokemons$ = this.store.select(selectDetailedPokemons);
  pokemon$ = this.store.select(selectSelectedPokemon);
  pokemons$ = this.store.select(selectPokemons);
  status$ = this.store.select(selectStatus);
  species$ = this.store.select(selectSpecies);
  speciesByColor$ = (color: string) =>
    this.store.select(selectSpeciesByColor(color));
}
