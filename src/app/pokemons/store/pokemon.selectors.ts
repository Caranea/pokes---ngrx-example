import { IAppState, IPokemonState } from './pokemon.state';

import { createSelector } from '@ngrx/store';

const selectPokemons = createSelector(
  (appState: IAppState) => appState.pokemons,
  (pokemonState: IPokemonState) => pokemonState.pokemons
);
const selectCurrentOffset = createSelector(
  (appState: IAppState) => appState.pokemons,
  (pokemonState: IPokemonState) => pokemonState.currentOffset
);
const selectSelectedPokemon = createSelector(
  (appState: IAppState) => appState.pokemons,
  (pokemonState: IPokemonState) => pokemonState.selectedPokemon
);
const selectStatus = createSelector(
  (appState: IAppState) => appState.pokemons,
  (pokemonState: IPokemonState) => pokemonState.status
);
const selectDetailedPokemons = createSelector(
  (appState: IAppState) => appState.pokemons,
  (pokemonState: IPokemonState) => pokemonState.detailedPokemons
);
const selectSpecies = createSelector(
  (appState: IAppState) => appState.pokemons,
  (pokemonState: IPokemonState) => pokemonState.species
);

const selectSpeciesByColor = (color: string) =>
  createSelector(selectSpecies, (species) => species[color]);

export {
  selectPokemons,
  selectCurrentOffset,
  selectSelectedPokemon,
  selectStatus,
  selectDetailedPokemons,
  selectSpecies,
  selectSpeciesByColor,
};
