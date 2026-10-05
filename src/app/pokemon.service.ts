import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Pokemon {
  name: string;

  sprites: {
    front_default: string;
  };

  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);

  getPokemon(name: string) {
    return this.http.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
  }
}