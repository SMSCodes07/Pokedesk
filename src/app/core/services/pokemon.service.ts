import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private database: AngularFireDatabase) { }
  // Metodo publico para retornar los datos
  public returnData() {
    return this.database.list('pokemonPlatform/');
  }
  // Metodo publico para retornar los datos
}
