import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonasService } from './services/personas/personas.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'demo';
  //TODO:declaracion de atributos necesarios para el control del formulario
  personaForm = new FormGroup({});
  paises: any;
  estados: any;
  personas: any;

  //TODO:constructor del formulario
  constructor(
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public personasServices: PersonasService
  ) {}
  //TODO:se crea  el formulario el cual sera consumido dinamicamente
  //desde el html por las etiquetas de angular
  ngOnInit(): void {
    this.buildForm();
    this.personaForm.get('pais')?.valueChanges.subscribe((value) => {
      this.estadosService.getAllEstadosByPais(value.id).subscribe(
        (resp) => {
          this.estados = resp;
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }
  //TODO: se crea el formulario en este caso para personas a guardar
  private buildForm() {
    this.personaForm = this.fb.group({
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
    });

    //TODO:se carga la variable paises mediante el metodo solicitado de la clase de servicios
    this.paisesService.getAllPaises().subscribe(
      (resp) => {
        this.paises = resp;
        //console.log(resp);
      },
      (error) => {
        console.error(error);
      }
    );

    this.personasServices.getAllPersonas().subscribe(
      (resp) => {
        this.personas = resp;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  //TODO: se guarda el metodo dando como valor el form con el servicio de save
  guardar(): void {
    this.personasServices.savePersonas(this.personaForm.value).subscribe(
      (resp) => {
        this.personaForm.reset();
        this.personas.push(resp);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  //TODO: se elimina la persona dando como valor el id del usuario
  borrar(idUser: any): void {
    this.personasServices.deletePersonas(idUser.id).subscribe(
      (resp) => {
        if (resp === true) {
          this.personas.pop(idUser);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
