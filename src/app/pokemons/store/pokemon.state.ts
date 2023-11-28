import { IPokemon, ISpecie } from '../models/pokemon.model';

import { TLoadingState } from '../../shared/models/loading-status.model';

interface IAppState {
  pokemons: IPokemonState;
}

interface IPokemonState {
  pokemons: Partial<IPokemon>[];
  detailedPokemons?: IPokemon[];
  selectedPokemon?: IPokemon;
  species: {
    [color: string]: ISpecie[];
  };
  status?: TLoadingState;
  currentOffset: number;
}

const initialPokemonState: IPokemonState = JSON.parse(
  localStorage.getItem('pokemons')!
) || {
  pokemons: [],
  detailedPokemons: [],
  species: {},
  currentOffset: 0,
};

export { IPokemonState, initialPokemonState, IAppState };
