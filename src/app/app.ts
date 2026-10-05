import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, Subject, switchMap } from 'rxjs';

import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private pokemonService = inject(PokemonService);

  private searchSubject = new Subject<string>();

  pokemon = toSignal(
    this.searchSubject.pipe(
      switchMap((name) =>
        this.pokemonService.getPokemon(name).pipe(
          catchError(() => of(null))
        )
      )
    ),
    { initialValue: null }
  );

  searchPokemon(name: string): void {
    const pokemonName = name.trim();

    if (pokemonName) {
      this.searchSubject.next(pokemonName);
    }
  }
}