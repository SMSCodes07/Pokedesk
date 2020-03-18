import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Variable para el formulario de los pokemon
  pokemonForm: FormGroup;
  // Variable para el formulario de los pokemon
  // Variable para referenciar a los modals
  modalReference: BsModalRef;
  // Variable para referenciar a los modals
  // Arreglo para la lista de pokemones
  pokemonList = [];
  // Arreglo para la lista de pokemones
  constructor(private formBuilder: FormBuilder, private database: AngularFireDatabase, private modalService: BsModalService,
              private pokeService: PokemonService) { }

  ngOnInit(): void {
    // Inicializar mi formulario
    this.pokemonForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      color: ['', [Validators.required]],
      Partidopolitico: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      altura: ['', [Validators.required]],
    });
    // Inicializar mi formulario
    // Trayendo lista de pokemon
    this.pokeService.returnData().valueChanges().subscribe((returnedData) => {
      this.pokemonList = returnedData;
    });
    // Trayendo lista de pokemon
  }
  // Funcion para abrir el modal
  openModal(pokemonModal: TemplateRef<any>) {
    // Abriendo modal
    this.modalService.show(pokemonModal);
    // Abriendo modal
  }
  // Funcion para abrir el modal
  // Funcion para crear un registro en la base de datos
  async createPokemon() {
    // Extrayendo datos del formulario
    const nombre = this.pokemonForm.value.nombre;
    const color = this.pokemonForm.value.color;
    const Partidopolitico = this.pokemonForm.value.Partidopolitico;
    const numero = this.pokemonForm.value.numero;
    const tipo = this.pokemonForm.value.tipo;
    const altura = this.pokemonForm.value.altura;
    // Extrayendo datos del formulario
    // Creando codigo unico
    const pokemonCode = Date.now();
    // Creando codigo unico
    // Creando registro en la base de datos
    await this.database.database.ref('pokemonPlatform/' + pokemonCode + '/').set({
      pokemonnombre: nombre,
      pokemoncolor: color,
      pokemonPartidopolitico: Partidopolitico,
      pokemonnumero: numero,
      pokemontipo: tipo,
      pokemonaltura: altura,
      pokemonCode: pokemonCode,
    })
    // Creando registro en la base de datos
    // Cerrando modal
    .then(() => {
      this.modalReference.hide();
    });
    // Cerrando modal
  }
  // Funcion para crear un registro en la base de datos
  // Funcion para borrar el pokemon
  deletePokemon(pokemonCode) {
    this.database.database.ref('pokemonPlatform/' + pokemonCode + '/').remove();
  }
  // Funcion para borrar el pokemon
}
