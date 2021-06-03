import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonasService } from './services/personas/personas.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo';
  //declaracion de atributos necesarios para el control del formulario 
  personaForm = new FormGroup({});
  paises: any
  estados: any

  //constructor del formulario
  constructor(
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public personasServices: PersonasService
  ) { }
  //se crea  el formulario el cual sera consumido dinamicamente 
  //desde el html por las etiquetas de angular 
  ngOnInit(): void {
    this.buildForm();
    this.personaForm.get("pais")?.valueChanges.subscribe(value => {
      this.estadosService.getAllEstadosByPais(value.id).subscribe(resp => {
        this.estados = resp;
      },
        error => { console.error(error) }
      )

    })
  }
  private buildForm() {
    this.personaForm = this.fb.group({
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
    })

    //se carga la variable paises mediante el metodo solicitado de la clase de servicios
    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
      //console.log(resp);
    },
      error => { console.error(error) }
    )
  }
  guardar(): void {
    this.personasServices.savePersonas(this.personaForm.value).subscribe(resp => {
    
    },
      error => { console.error(error) }
    )
  }
}
