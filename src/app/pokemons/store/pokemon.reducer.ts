import * as pokemonActions from './pokemon.actions';
import * as pokemonState from './pokemon.state';

import { Action, createReducer, on } from '@ngrx/store';
import {
  ELoadingStatus,
  ILoadingFailedState,
  ILoadingInProgressState,
  ILoadingSuccessState,
} from '../../shared/models/loading-status.model';

const internalReducer = createReducer(
  pokemonState.initialPokemonState,

  on(pokemonActions.getPokemons, state => {
    const status: ILoadingInProgressState = {
      state: ELoadingStatus.LOADING,
    };
    return {
      ...state,
      status,
    };
  }),
  on(pokemonActions.getPokemonsSuccess, (state, props) => {
    const status: ILoadingSuccessState = {
      state: ELoadingStatus.SUCCESS,
    };

    return {
      ...state,
      status,
      pokemons: state.pokemons.concat(props.pokemons),
      currentOffset: state.currentOffset + props.pokemons.length,
    };
  }),
  on(pokemonActions.getPokemonsFailure, (state, props) => {
    const status: ILoadingFailedState = {
      state: ELoadingStatus.FAILURE,
      message: props.message,
      statusCode: props.status,
    };
    return {
      ...state,
      status,
    };
  }),
  on(pokemonActions.getPokemonSuccess, (state, props) => {
    return {
      ...state,
      selectedPokemon: props.pokemon,
      detailedPokemons: state.detailedPokemons?.concat(props.pokemon),
    };
  }),
  on(pokemonActions.getCachedPokemonSuccess, (state, props) => {
    return {
      ...state,
      selectedPokemon: props.pokemon,
    };
  }),
  on(pokemonActions.getSpeciesSuccess, (state, props) => {
    const species = { ...state.species };
    species[props.color] = props.species;
    return {
      ...state,
      species,
    };
  })
);

export function pokemonReducer(
  state: pokemonState.IPokemonState | undefined,
  action: Action
) {
  return internalReducer(state, action);
}
