import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EpicrisisDTO } from 'src/app/dto/epicrisis.dto';
import { EpicrisisService } from 'src/app/service/epicrisis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-epicrisis',
  templateUrl: './epicrisis.component.html',
  styleUrls: ['./epicrisis.component.css']
})
export class EpicrisisComponent {

  idHistoria: number = 0;
  objEpicrisis = new EpicrisisDTO();
  dataFormGroup: FormGroup;

  constructor(private modalService: BsModalService,
    private bsModalEpicrisis: BsModalRef,
    private epicrisisService: EpicrisisService) {
    this.dataFormGroup = new FormGroup({
      textEpicrisis: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {

  }

  AsignarInformacion(idHistoria: number) {
    this.idHistoria = idHistoria;
    this.ObtenerDatosMaestroPorId();
  }

  CerrarModal() {
    this.bsModalEpicrisis.hide();
  }

  ObtenerDatosMaestroPorId() {
    this.epicrisisService.ObtenerEpicrisis(this.idHistoria)
      .subscribe({
        next: (data: EpicrisisDTO) => {
          this.objEpicrisis = new EpicrisisDTO();
          this.objEpicrisis.Id = data.Id;
          this.objEpicrisis.IdHistoria = data.IdHistoria;
          this.objEpicrisis.Detalle = data.Detalle;
          this.AsignarValoresAControles();
        },
        error: (e) => {
          console.error('error: ', e);
        },
        complete: () => { }
      });
  }


  AsignarValoresAControles() {
    this.dataFormGroup.controls['textEpicrisis'].setValue(this.objEpicrisis.Detalle);
  }

  Guardar() {
    for (let c in this.dataFormGroup.controls) {
      this.dataFormGroup.controls[c].markAsTouched();
    }

    if (this.dataFormGroup.valid) {
      this.objEpicrisis.Detalle = this.dataFormGroup.controls['textEpicrisis'].value;
      this.objEpicrisis.IdHistoria = this.idHistoria;

      if (this.objEpicrisis.Id > 0) {
        this.epicrisisService.Modificar(this.objEpicrisis)
          .subscribe({
            next: (data: any) => {
              this.MostrarNotificacionSuccess('Se guardo con exito', '');
              this.bsModalEpicrisis.hide();
            },
            error: (e) => {
              console.error('error: ', e);
            },
            complete: () => { }
          });
      } else {
        this.epicrisisService.Insertar(this.objEpicrisis)
          .subscribe({
            next: (data: any) => {
              this.bsModalEpicrisis.hide();
            },
            error: (e) => {
              console.error('error: ', e);
            },
            complete: () => { }
          });
      }
    } else {
      this.MostrarNotificacionAlerta('Complete los campos obligatorios');
    }
  }

  MostrarNotificacionAlerta(mensaje: string) {
    Swal.fire({
      icon: 'warning',
      title: "Historia",
      text: mensaje
    });
  }


  MostrarNotificacionSuccess(mensaje: string, titulo: string) {
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje
    });
  }


  get Controls() {
    return this.dataFormGroup.controls;
  }

}