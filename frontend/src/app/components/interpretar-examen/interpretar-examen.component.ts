import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InterpretacionDTO } from 'src/app/dto/interpretacion.dto';
import { InterpretacionService } from 'src/app/service/interpretacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interpretar-examen',
  templateUrl: './interpretar-examen.component.html',
  styleUrls: ['./interpretar-examen.component.css']
})
export class InterpretarExamenComponent {

  idHistoria: number = 0;
  objInterpretacion = new InterpretacionDTO();
  dataFormGroup: FormGroup;

  constructor(private modalService: BsModalService,
    private interpretacionService: InterpretacionService,
    private bsModalInterpretarExamen: BsModalRef) {
    this.dataFormGroup = new FormGroup({
      inputPanoramica: new FormControl('', [Validators.required]),
      inputHmanograma: new FormControl('', [Validators.required]),
      inputTiempoSangria: new FormControl('', [Validators.required]),
      inputCoagulacion: new FormControl('', [Validators.required]),
    });
  }

  CerrarModal() {
    this.bsModalInterpretarExamen.hide();
  }

  ngOnInit() {

  }

  AsignarInformacion(idHistoria: number) {
    this.idHistoria = idHistoria;
    this.ObtenerDatosMaestroPorId();
  }

  ObtenerDatosMaestroPorId() {
    this.interpretacionService.ObtenerInterpretacion(this.idHistoria)
      .subscribe({
        next: (data: InterpretacionDTO) => {
          this.objInterpretacion = new InterpretacionDTO();
          this.objInterpretacion.Id = data.Id;
          this.objInterpretacion.IdHistoria = data.IdHistoria;
          this.objInterpretacion.Panoramica = data.Panoramica;
          this.objInterpretacion.Hemograma = data.Hemograma
          this.objInterpretacion.TiempoSangria = data.TiempoSangria;
          this.objInterpretacion.TiempoCoagulacion = data.TiempoCoagulacion;
          this.AsignarValoresAControles();
        },
        error: (e) => {
          console.error('error: ', e);
        },
        complete: () => { }
      });
  }


  AsignarValoresAControles() {
    this.dataFormGroup.controls['inputPanoramica'].setValue(this.objInterpretacion.Panoramica);
    this.dataFormGroup.controls['inputHmanograma'].setValue(this.objInterpretacion.Hemograma);
    this.dataFormGroup.controls['inputTiempoSangria'].setValue(this.objInterpretacion.TiempoSangria);
    this.dataFormGroup.controls['inputCoagulacion'].setValue(this.objInterpretacion.TiempoCoagulacion);
  }

  Guardar() {
    for (let c in this.dataFormGroup.controls) {
      this.dataFormGroup.controls[c].markAsTouched();
    }

    if (this.dataFormGroup.valid) {
      this.objInterpretacion.Panoramica = this.dataFormGroup.controls['inputPanoramica'].value;
      this.objInterpretacion.Hemograma = this.dataFormGroup.controls['inputHmanograma'].value;
      this.objInterpretacion.TiempoSangria = this.dataFormGroup.controls['inputTiempoSangria'].value;
      this.objInterpretacion.TiempoCoagulacion = this.dataFormGroup.controls['inputCoagulacion'].value;
      this.objInterpretacion.IdHistoria = this.idHistoria;

      if (this.objInterpretacion.Id > 0) {
        this.interpretacionService.Modificar(this.objInterpretacion)
          .subscribe({
            next: (data: any) => {
              this.MostrarNotificacionSuccess('Se guardo con exito', '');
              this.bsModalInterpretarExamen.hide();
            },
            error: (e) => {
              console.error('error: ', e);
            },
            complete: () => { }
          });
      } else {
        this.interpretacionService.Insertar(this.objInterpretacion)
          .subscribe({
            next: (data: any) => {
              this.bsModalInterpretarExamen.hide();
            },
            error: (e) => {
              console.error('error: ', e);
            },
            complete: () => { }
          });
      }
    } else {
      this.MostrarNotificacionAlerta('complete los campos obligatorios');
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