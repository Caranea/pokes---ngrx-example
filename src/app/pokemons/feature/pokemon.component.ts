import { Component, inject } from '@angular/core';
import {
  IModal,
  ModalComponent,
} from '../../shared/features/modal/modal.component';
import { ISpecieResponse, Specie } from '../models/pokemon.model';
import { PokemonService, urls } from '../data-access/pokemon.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { skip, take } from 'rxjs';

import { CardComponent } from '../../shared/ui/card/card.component';
import { CommonModule } from '@angular/common';
import { ELoadingStatus } from '../../shared/models/loading-status.model';
import { PokemonFacade } from '../store/pokemon.facade';
import { SearchFormComponent } from '../../shared/features/search-form/search-form.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  templateUrl: `./pokemon.component.html`,
  providers: [PokemonFacade],
  imports: [CardComponent, CommonModule, ModalComponent, SearchFormComponent],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ],
})
export class PokemonComponent {
  private readonly pokemonFacade = inject(PokemonFacade);
  private readonly pokemonService = inject(PokemonService);
  public isSpecie = false;
  public pokemons$ = this.pokemonFacade.pokemons$;
  readonly pokemon$ = this.pokemonFacade.pokemon$;
  readonly status$ = this.pokemonFacade.status$;

  public pokemonModal: IModal | undefined;
  public selectedUrl: string | undefined;
  public buttonText = 'Load more';
  public showModal: boolean = true;

  constructor() {
    this.pokemonFacade.pokemons$.pipe(take(1)).subscribe(pokemons => {
      if (pokemons.length === 0) {
        this.loadMore();
      }
    });
    this.status$.subscribe(status => {
      if (status?.state === ELoadingStatus.LOADING) {
        this.buttonText = 'Loading...';
      } else {
        this.buttonText = 'Load more';
      }
    });
  }

  loadMore() {
    this.pokemonFacade.getPokemons();
  }

  showDetails(url: string) {
    if (this.isSpecie) {
      this.pokemonService.getSpecie(url).subscribe(result => {
        const specie = new Specie(result as ISpecieResponse);
        this.displayPokemon(
          {
            title: (result as ISpecieResponse).name,
            data: { ...specie },
          },
          url
        );
      });
    } else {
      if (this.selectedUrl === url) {
        this.showModal = true;
      } else {
        this.pokemon$.pipe(skip(1), take(1)).subscribe(pokemonData => {
          this.displayPokemon(
            {
              title: pokemonData!.name,
              data: { ...pokemonData! },
            },
            url
          );
        });
        this.pokemonFacade.getPokemon(url);
      }
    }
  }

  getData(data: { name?: string; color?: string }) {
    if (data.name) {
      this.showDetails(
        urls.base + urls.pokemonsByName(data.name.toLowerCase())
      );
    } else if (data.color) {
      this.isSpecie = true;
      this.pokemons$ = this.pokemonFacade.speciesByColor$(data.color);
      this.pokemonFacade.getSpecies(data.color);
    } else if (data.color === '') {
      this.isSpecie = false;
      this.pokemons$ = this.pokemonFacade.pokemons$;
    }
  }

  displayPokemon(modalData: IModal, url?: string): void {
    this.pokemonModal = modalData;
    this.showModal = true;
    this.selectedUrl = url;
  }
}
