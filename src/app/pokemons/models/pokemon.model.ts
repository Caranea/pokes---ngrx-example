type TDisplay = 'nestedObject' | 'image' | 'namedProperty';
interface IPokemonProperty {
  label: string;
  url?: string;
  value?: string | number | boolean;
  uiDisplay?: false | TDisplay;
}

interface IPokemonStat {
  baseStat: number;
  effort: number;
  stat: {
    name: string;
    url: URL;
  };
}

interface IPokemonStatResponse extends IPokemonStat {
  base_stat: number;
}

interface IPokemon {
  baseExperience?: IPokemonProperty;
  height?: number;
  id?: number;
  isDefault?: IPokemonProperty;
  name: string;
  order?: number;
  picture?: IPokemonProperty;
  urlData: IPokemonProperty;
  statistics?: IPokemonProperty[];
  types?: IPokemonProperty[];
  weight?: number;
}

interface ISpecie {
  baseExperience?: IPokemonProperty;
  baseHappiness?: IPokemonProperty;
  captureRate?: IPokemonProperty;
  isBaby?: IPokemonProperty;
  name: string;
  urlData: IPokemonProperty;
  description?: IPokemonProperty;
}

interface ISpecieResponse extends ISpecie {
  base_experience: number;
  base_happiness: number;
  capture_rate: number;
  is_baby: boolean;
  url: string;
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string; url: string };
    version: { name: string; url: string };
  }[];
}

interface IPokemonResponse extends IPokemon {
  base_experience: number;
  is_default: boolean;
  url: string;
  stats?: IPokemonStatResponse[];
  location_area_encounters: URL;
  sprites?: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}

class Pokemon implements IPokemon {
  picture?: IPokemonProperty;
  statistics?: IPokemonProperty[];
  baseExperience?: IPokemonProperty;
  height?: number;
  name: string;
  urlData: IPokemonProperty;
  weight?: number;

  constructor(pokemonData: IPokemonResponse, url: string) {
    this.picture = {
      label: 'Picture',
      url: pokemonData.sprites?.other.dream_world.front_default!,
      uiDisplay: 'image',
    };
    this.statistics = pokemonData.stats?.map((stat) => {
      return {
        label: stat.stat.name,
        value: stat.base_stat,
      } as IPokemonProperty;
    });
    this.baseExperience = {
      value: pokemonData.base_experience,
      label: 'Base Experience',
      uiDisplay: 'namedProperty',
    };
    this.height = pokemonData.height;
    this.name = pokemonData.name;
    this.urlData = {
      label: 'URL',
      url: url,
      uiDisplay: false,
    };
    this.weight = pokemonData.weight;
  }
}

class Specie implements ISpecie {
  baseHappiness?: IPokemonProperty;
  captureRate?: IPokemonProperty;
  isBaby?: IPokemonProperty;
  description?: IPokemonProperty;
  name: string;
  urlData: IPokemonProperty;

  constructor(specieData: ISpecieResponse) {
    this.baseHappiness = {
      value: specieData.base_happiness,
      uiDisplay: 'namedProperty',
      label: 'Base Happiness',
    };
    this.captureRate = {
      value: specieData.capture_rate,

      uiDisplay: 'namedProperty',
      label: 'Capture Rate',
    };
    this.isBaby = {
      value: specieData.is_baby ? 'Yes' : 'No',
      uiDisplay: 'namedProperty',
      label: 'Is Baby',
    };
    this.name = specieData.name;
    this.urlData = {
      label: 'URL',
      url: specieData.url,
      uiDisplay: false,
    };
    this.description = {
      value: specieData.flavor_text_entries[0].flavor_text
        .split('\f')
        .join(' '),
      label: 'Description',
      uiDisplay: 'namedProperty',
    };
  }
}

export {
  IPokemonProperty,
  IPokemonStat,
  IPokemon,
  Pokemon,
  IPokemonResponse,
  ISpecie,
  Specie,
  ISpecieResponse,
};
