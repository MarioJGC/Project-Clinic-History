import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotasEvolutivasDTO } from 'src/app/dto/notas-evolutivas.dto';
import { NotasEvolutivasService } from 'src/app/service/notasevolutivas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas-evolutivas',
  templateUrl: './notas-evolutivas.component.html',
  styleUrls: ['./notas-evolutivas.component.css']
})
export class NotasEvolutivasComponent {

  idHistoria: number = 0;
  listadoEvolutivo: NotasEvolutivasDTO[] = [];
  listadoEvolutivoNuevo: NotasEvolutivasDTO[] = [];
  dataFormGroup: FormGroup;

  constructor(private modalService: BsModalService,
    private bsModalNotasEvolutivas: BsModalRef,
    private service: NotasEvolutivasService) {
    this.dataFormGroup = new FormGroup({
      inputFechaRegistro: new FormControl(''),
      inputDescripcion: new FormControl(''),
    });
  }

  AsignarInformacion(idHistoria: number) {
    this.idHistoria = idHistoria;
    this.ObtenerConfiguracion();
  }


  ObtenerConfiguracion() {
    this.service.ObtenerNotasEvolutivas(this.idHistoria)
      .subscribe({
        next: (data) => {
          if (data != null) {
            this.listadoEvolutivo = data;
          } else {
          }
        },
        error: (e) => {
          console.log('Error: ', e);
        },
        complete: () => { }
      });
  }

  AgregarLista() {
    let nota = new NotasEvolutivasDTO;
    nota.IdHistoria = this.idHistoria;
    let fecha = this.dataFormGroup.controls['inputFechaRegistro'].value;
    nota.Fecha = moment(fecha).format('DD-MM-YYYY');
    nota.Detalle = this.dataFormGroup.controls['inputDescripcion'].value;
    nota.Firma = '';
    this.listadoEvolutivoNuevo.push(nota);
    this.dataFormGroup.controls['inputDescripcion'].reset();
    this.dataFormGroup.controls['inputFechaRegistro'].reset();
  }

  Guardar() {
    if (this.listadoEvolutivoNuevo.length > 0) {
      this.listadoEvolutivoNuevo.forEach(element => {
        this.service.Insertar(element)
          .subscribe({
            next: (data: any) => {
              this.bsModalNotasEvolutivas.hide();
            },
            error: (e) => {
              console.error('error: ', e);
            },
            complete: () => { }
          });
      });
    } else {
      this.MostrarNotificacionAlerta('Agrege notas para poder guardar');
    }
  }

  MostrarNotificacionSuccess(mensaje: string, titulo: string) {
    Swal.fire({
      icon: 'success',
      title: "Historia",
      text: mensaje
    });
  }

  MostrarNotificacionAlerta(mensaje: string) {
    Swal.fire({
      icon: 'warning',
      title: "Historia",
      text: mensaje
    });
  }

  Borrar(i: number) {
    this.listadoEvolutivo.splice(i, 1);
  }

  CerrarModal() {
    this.bsModalNotasEvolutivas.hide();
  }
}