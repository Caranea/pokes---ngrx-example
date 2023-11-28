import { IPokemon, ISpecie } from '../models/pokemon.model';
import { createAction, props } from '@ngrx/store';

const getPokemons = createAction('[Pokemon] Get Pokemons');

const getPokemonsSuccess = createAction(
  '[Pokemon] Get Pokemons Success',
  props<{ pokemons: IPokemon[] }>()
);

const getCachedPokemonSuccess = createAction(
  '[Pokemon] Get Cached Pokemon Success',
  props<{ pokemon: IPokemon }>()
);

const getPokemonsFailure = createAction(
  '[Pokemon] Get Pokemons Failure',
  props<{ message: string; status: number }>()
);

const getPokemon = createAction(
  '[Pokemon] Get Pokemon',
  props<{ url: string; byName: boolean }>()
);

const getPokemonSuccess = createAction(
  '[Pokemon] Get Pokemon Success',
  props<{ pokemon: IPokemon }>()
);

const getSpecies = createAction(
  '[Pokemon] Get Species',
  props<{ color: string }>()
);

const getSpeciesSuccess = createAction(
  '[Pokemon] Get Species Success',
  props<{ color: string; species: ISpecie[] }>()
);

const getCachedSpeciesSuccess = createAction(
  '[Pokemon] Get Cached Species Success',
  props<{ color: string; species: ISpecie[] }>()
);

export {
  getPokemons,
  getPokemon,
  getPokemonSuccess,
  getPokemonsSuccess,
  getCachedPokemonSuccess,
  getPokemonsFailure,
  getSpecies,
  getSpeciesSuccess,
  getCachedSpeciesSuccess,
};
