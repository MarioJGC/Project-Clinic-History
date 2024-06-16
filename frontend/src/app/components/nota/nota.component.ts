import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotaDTO } from 'src/app/dto/nota.dto';
import { NotaService } from 'src/app/service/nota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent {



  idHistoria: number = 0;
  objNotas = new NotaDTO();
  dataFormGroup: FormGroup;

  constructor(private modalService: BsModalService,
    private bsModalNota: BsModalRef,
    private epicrisisService: NotaService) {
    this.dataFormGroup = new FormGroup({
      textNotas: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {

  }

  AsignarInformacion(idHistoria: number) {
    this.idHistoria = idHistoria;
    this.ObtenerDatosMaestroPorId();
  }

  CerrarModal() {
    this.bsModalNota.hide();
  }

  ObtenerDatosMaestroPorId() {
    this.epicrisisService.ObtenerNota(this.idHistoria)
      .subscribe({
        next: (data: NotaDTO) => {
          if (data != null) {
            this.objNotas = new NotaDTO();
            this.objNotas.Id = data.Id;
            this.objNotas.IdHistoria = data.IdHistoria;
            this.objNotas.TienePermiso = data.TienePermiso;
            this.objNotas.Nota = data.Nota;
            this.AsignarValoresAControles();
          }
        },
        error: (e) => {
          console.error('error: ', e);
        },
        complete: () => { }
      });
  }


  AsignarValoresAControles() {
    this.dataFormGroup.controls['textNotas'].setValue(this.objNotas.Nota);
  }

  Guardar() {
    for (let c in this.dataFormGroup.controls) {
      this.dataFormGroup.controls[c].markAsTouched();
    }

    if (this.dataFormGroup.valid) {
      this.objNotas.Nota = this.dataFormGroup.controls['textNotas'].value;
      this.objNotas.IdHistoria = this.idHistoria;
      this.objNotas.TienePermiso = true;

      if (this.objNotas.Id > 0) {
        this.epicrisisService.Modificar(this.objNotas)
          .subscribe({
            next: (data: any) => {
              this.MostrarNotificacionSuccess('Se guardo con exito', '');
              this.bsModalNota.hide();
            },
            error: (e) => {
              console.error('error: ', e);
            },
            complete: () => { }
          });
      } else {
        this.epicrisisService.Insertar(this.objNotas)
          .subscribe({
            next: (data: any) => {
              this.bsModalNota.hide();
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