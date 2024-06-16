import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ComboDTO } from 'src/app/dto/combo.dto';
import { HistoriaClinicaDTO } from 'src/app/dto/historia-general.dto';
import { HistoriaDTO } from 'src/app/dto/historia.dto';
import { HistoriaService } from 'src/app/service/historia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent {

  idHistoria: number = 0;
  tieneHistoria: boolean = false;
  objHistoriaClinica = new HistoriaClinicaDTO();
  objHistoria = new HistoriaDTO();
  historiaClinica: string = '24.5 HC-0005';
  dataFormGroup: FormGroup;
  fechaActual = moment().toDate();

  comboCraneo: ComboDTO[] = [{ 'id': 1, 'nombre': 'Normocefalo' }, { 'id': 2, 'nombre': 'Braquicéfalo' }, { 'id': 3, 'nombre': 'Dolicocéfalo' }];
  comboCara: ComboDTO[] = [{ 'id': 1, 'nombre': 'Normofacial' }, { 'id': 2, 'nombre': 'Braquifacial' }, { 'id': 3, 'nombre': 'Dolicofacial' }];
  comboSimetria: ComboDTO[] = [{ 'id': 1, 'nombre': 'Tres tercios' }, { 'id': 2, 'nombre': 'Bilateral' }, { 'id': 3, 'nombre': 'Perfil' }];

  constructor(private modalService: BsModalService,
    private bsModalHistoriaClinica: BsModalRef,
    private historiaService: HistoriaService) {
    this.dataFormGroup = new FormGroup({
      inputEctoscopia: new FormControl('', [Validators.required]),
      inputAnamnesis: new FormControl('', [Validators.required]),
      inputMotivoConsulta: new FormControl('', [Validators.required]),
      inputEnfermedadActual: new FormControl('', [Validators.required]),

      inputApetito: new FormControl('', [Validators.required]),
      inputDeposiciones: new FormControl('', [Validators.required]),
      inputSed: new FormControl('', [Validators.required]),
      inputOrina: new FormControl('', [Validators.required]),
      inputSuenio: new FormControl('', [Validators.required]),

      inputPersonales: new FormControl('', [Validators.required]),
      inputPatologicos: new FormControl('', [Validators.required]),
      inputAlergias: new FormControl('', [Validators.required]),
      inputFamiliares: new FormControl('', [Validators.required]),

      inputPeso: new FormControl('', [Validators.required]),
      inputTalla: new FormControl('', [Validators.required]),
      inputImc: new FormControl('', [Validators.required]),
      inputBiotipo: new FormControl('', [Validators.required]),
      inputPiel: new FormControl('', [Validators.required]),
      inputUnias: new FormControl('', [Validators.required]),
      inputCuello: new FormControl('', [Validators.required]),

      inputPresionArterial: new FormControl('', [Validators.required]),
      inputFrecuenciaRespiratoria: new FormControl('', [Validators.required]),
      inputPulso: new FormControl('', [Validators.required]),
      inputTemperatura: new FormControl('', [Validators.required]),

      inputFacie: new FormControl('', [Validators.required]),
      inpuCraneo: new FormControl('', [Validators.required]),
      inpuCara: new FormControl('', [Validators.required]),
      inpuSimetria: new FormControl('', [Validators.required]),

      inputTemporal: new FormControl('', [Validators.required]),
      inputMasetero: new FormControl('', [Validators.required]),
      inputPterigoideoInterno: new FormControl('', [Validators.required]),
      inputPterigoideoExterno: new FormControl('', [Validators.required]),
      inputDigastrico: new FormControl('', [Validators.required]),
      inputEsternocleidomastoideo: new FormControl('', [Validators.required]),

      inpuTrayectoria: new FormControl('', [Validators.required]),
      inputRuidos: new FormControl('', [Validators.required]),
      inputPalapacion: new FormControl('', [Validators.required]),
      inputGradoApertura: new FormControl('', [Validators.required]),
      inputGanglios: new FormControl('', [Validators.required]),

      inputLabiosComisura: new FormControl('', [Validators.required]),
      inputPaladarDuro: new FormControl('', [Validators.required]),
      inputCirgarrillos: new FormControl('', [Validators.required]),
      inputPisoBoca: new FormControl('', [Validators.required]),
      inputLengua: new FormControl('', [Validators.required]),
      inputOrofaringe: new FormControl('', [Validators.required]),
      inputFrenillos: new FormControl('', [Validators.required]),
      inputSaliva: new FormControl('', [Validators.required]),

      inputResumenAnamnesis: new FormControl('', [Validators.required]),
      inputDiagnosticoIngreso: new FormControl('', [Validators.required]),
      inputExamenAuxiliar: new FormControl('', [Validators.required]),
      inputDiagnosticoSalida: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() { }

  AsignarInformacion(historia: HistoriaDTO) {
    this.idHistoria = historia.Id;
    this.objHistoria = historia;
    this.ObtenerDatosMaestroPorId();
  }

  CerrarModal() {
    this.bsModalHistoriaClinica.hide();
  }

  ObtenerDatosMaestroPorId() {
    this.historiaService.ObtenerHistoriaCompleta(this.idHistoria)
      .subscribe({
        next: (data) => {
          if (data != null) {
            this.objHistoriaClinica = data;
            this.AsignarValoresAControles();
            if (this.objHistoriaClinica.IdAnamnesis > 0) {
              this.tieneHistoria = true;
            } else {
              this.tieneHistoria = false;
            }
          } else {
            this.tieneHistoria = false;
          }
        },
        error: (e) => {

          console.log('Error: ', e);

        },
        complete: () => { }
      });
  }


  AsignarValoresAControles() {
    this.dataFormGroup.controls['inputEctoscopia'].setValue(this.objHistoriaClinica.Ectoscopia);
    this.dataFormGroup.controls['inputAnamnesis'].setValue(this.objHistoriaClinica.Anamensis);
    this.dataFormGroup.controls['inputMotivoConsulta'].setValue(this.objHistoriaClinica.MotivoConsulta);
    this.dataFormGroup.controls['inputEnfermedadActual'].setValue(this.objHistoriaClinica.EnfermedadActual);

    this.dataFormGroup.controls['inputApetito'].setValue(this.objHistoriaClinica.Apetito);
    this.dataFormGroup.controls['inputDeposiciones'].setValue(this.objHistoriaClinica.Deposiciones);
    this.dataFormGroup.controls['inputSed'].setValue(this.objHistoriaClinica.Sed);
    this.dataFormGroup.controls['inputOrina'].setValue(this.objHistoriaClinica.Orina);
    this.dataFormGroup.controls['inputSuenio'].setValue(this.objHistoriaClinica.Suenio);

    this.dataFormGroup.controls['inputPersonales'].setValue(this.objHistoriaClinica.Personales);
    this.dataFormGroup.controls['inputPatologicos'].setValue(this.objHistoriaClinica.Patologicos);
    this.dataFormGroup.controls['inputAlergias'].setValue(this.objHistoriaClinica.Alergias);
    this.dataFormGroup.controls['inputFamiliares'].setValue(this.objHistoriaClinica.Familiares);

    this.dataFormGroup.controls['inputPeso'].setValue(this.objHistoriaClinica.Peso);
    this.dataFormGroup.controls['inputTalla'].setValue(this.objHistoriaClinica.Talla);
    let imc = (Number(this.objHistoriaClinica.Peso) * Number(this.objHistoriaClinica.Talla)) / 2;
    this.dataFormGroup.controls['inputImc'].setValue(imc);
    this.dataFormGroup.controls['inputBiotipo'].setValue(this.objHistoriaClinica.Biotipo);
    this.dataFormGroup.controls['inputPiel'].setValue(this.objHistoriaClinica.Piel);
    this.dataFormGroup.controls['inputUnias'].setValue(this.objHistoriaClinica.AnexoUnias);
    this.dataFormGroup.controls['inputCuello'].setValue(this.objHistoriaClinica.AnexoCabello);

    this.dataFormGroup.controls['inputPresionArterial'].setValue(this.objHistoriaClinica.PresionArterial);
    this.dataFormGroup.controls['inputFrecuenciaRespiratoria'].setValue(this.objHistoriaClinica.FrecuenciaRespiratoria);
    this.dataFormGroup.controls['inputPulso'].setValue(this.objHistoriaClinica.Pulso);
    this.dataFormGroup.controls['inputTemperatura'].setValue(this.objHistoriaClinica.Temperatura);

    this.dataFormGroup.controls['inputFacie'].setValue(this.objHistoriaClinica.Facie);
    this.dataFormGroup.controls['inpuCraneo'].setValue(this.objHistoriaClinica.IdCraneo);
    this.dataFormGroup.controls['inpuCara'].setValue(this.objHistoriaClinica.IdCara);
    this.dataFormGroup.controls['inpuSimetria'].setValue(this.objHistoriaClinica.IdSimetria);

    this.dataFormGroup.controls['inputTemporal'].setValue(this.objHistoriaClinica.Temporal);
    this.dataFormGroup.controls['inputMasetero'].setValue(this.objHistoriaClinica.Masetero);
    this.dataFormGroup.controls['inputPterigoideoInterno'].setValue(this.objHistoriaClinica.PterigoideoInterno);
    this.dataFormGroup.controls['inputPterigoideoExterno'].setValue(this.objHistoriaClinica.PterigoideoExterno);
    this.dataFormGroup.controls['inputDigastrico'].setValue(this.objHistoriaClinica.Digastrico);
    this.dataFormGroup.controls['inputEsternocleidomastoideo'].setValue(this.objHistoriaClinica.Esternocleidomastoideo);

    this.dataFormGroup.controls['inpuTrayectoria'].setValue(this.objHistoriaClinica.Trayectoria);
    this.dataFormGroup.controls['inputRuidos'].setValue(this.objHistoriaClinica.RuidosAtm);
    this.dataFormGroup.controls['inputPalapacion'].setValue(this.objHistoriaClinica.Palpacion);
    this.dataFormGroup.controls['inputGradoApertura'].setValue(this.objHistoriaClinica.GradoApertura);
    this.dataFormGroup.controls['inputGanglios'].setValue(this.objHistoriaClinica.Ganglios);

    this.dataFormGroup.controls['inputLabiosComisura'].setValue(this.objHistoriaClinica.LabiosComisuralabial);
    this.dataFormGroup.controls['inputPaladarDuro'].setValue(this.objHistoriaClinica.PaladarDuro);
    this.dataFormGroup.controls['inputCirgarrillos'].setValue(this.objHistoriaClinica.Cigarrillos);
    this.dataFormGroup.controls['inputPisoBoca'].setValue(this.objHistoriaClinica.PisoBoca);
    this.dataFormGroup.controls['inputLengua'].setValue(this.objHistoriaClinica.Lengua);
    this.dataFormGroup.controls['inputOrofaringe'].setValue(this.objHistoriaClinica.Orofaringe);
    this.dataFormGroup.controls['inputFrenillos'].setValue(this.objHistoriaClinica.Frenillos);
    this.dataFormGroup.controls['inputSaliva'].setValue(this.objHistoriaClinica.Saliva);

    this.dataFormGroup.controls['inputResumenAnamnesis'].setValue(this.objHistoriaClinica.ResumenAnamnesis);
    this.dataFormGroup.controls['inputDiagnosticoIngreso'].setValue(this.objHistoriaClinica.DiagnosticoIngreso);
    this.dataFormGroup.controls['inputExamenAuxiliar'].setValue(this.objHistoriaClinica.DetalleExamenAuxiliar);
    this.dataFormGroup.controls['inputDiagnosticoSalida'].setValue(this.objHistoriaClinica.DiagnosticoSalida);
  }

  AsignarValoresObjeto() {
    if (this.tieneHistoria) {
      this.objHistoriaClinica.Id = this.idHistoria;
    }
    this.objHistoriaClinica.IdHistoria = this.idHistoria;
    this.objHistoriaClinica.Ectoscopia = this.dataFormGroup.controls['inputEctoscopia'].value;
    this.objHistoriaClinica.Anamensis = this.dataFormGroup.controls['inputAnamnesis'].value;
    this.objHistoriaClinica.MotivoConsulta = this.dataFormGroup.controls['inputMotivoConsulta'].value;
    this.objHistoriaClinica.EnfermedadActual = this.dataFormGroup.controls['inputEnfermedadActual'].value;

    this.objHistoriaClinica.Apetito = this.dataFormGroup.controls['inputApetito'].value;
    this.objHistoriaClinica.Deposiciones = this.dataFormGroup.controls['inputDeposiciones'].value;
    this.objHistoriaClinica.Sed = this.dataFormGroup.controls['inputSed'].value;
    this.objHistoriaClinica.Orina = this.dataFormGroup.controls['inputOrina'].value;
    this.objHistoriaClinica.Suenio = this.dataFormGroup.controls['inputSuenio'].value;

    this.objHistoriaClinica.Personales = this.dataFormGroup.controls['inputPersonales'].value;
    this.objHistoriaClinica.Patologicos = this.dataFormGroup.controls['inputPatologicos'].value;
    this.objHistoriaClinica.Alergias = this.dataFormGroup.controls['inputAlergias'].value;
    this.objHistoriaClinica.Familiares = this.dataFormGroup.controls['inputFamiliares'].value;

    this.objHistoriaClinica.Peso = this.dataFormGroup.controls['inputPeso'].value;
    this.objHistoriaClinica.Talla = this.dataFormGroup.controls['inputTalla'].value;
    let imc = (Number(this.objHistoriaClinica.Peso) * Number(this.objHistoriaClinica.Talla)) / 2;
    imc = this.dataFormGroup.controls['inputImc'].value;
    this.objHistoriaClinica.Biotipo = this.dataFormGroup.controls['inputBiotipo'].value;
    this.objHistoriaClinica.Piel = this.dataFormGroup.controls['inputPiel'].value;
    this.objHistoriaClinica.AnexoUnias = this.dataFormGroup.controls['inputUnias'].value;
    this.objHistoriaClinica.AnexoCabello = this.dataFormGroup.controls['inputCuello'].value;

    this.objHistoriaClinica.PresionArterial = this.dataFormGroup.controls['inputPresionArterial'].value;
    this.objHistoriaClinica.FrecuenciaRespiratoria = this.dataFormGroup.controls['inputFrecuenciaRespiratoria'].value;
    this.objHistoriaClinica.Pulso = this.dataFormGroup.controls['inputPulso'].value;
    this.objHistoriaClinica.Temperatura = this.dataFormGroup.controls['inputTemperatura'].value;

    this.objHistoriaClinica.Facie = this.dataFormGroup.controls['inputFacie'].value;
    this.objHistoriaClinica.IdCraneo = Number(this.dataFormGroup.controls['inpuCraneo'].value);
    this.objHistoriaClinica.IdCara = Number(this.dataFormGroup.controls['inpuCara'].value);
    this.objHistoriaClinica.IdSimetria = Number(this.dataFormGroup.controls['inpuSimetria'].value);

    this.objHistoriaClinica.Temporal = this.dataFormGroup.controls['inputTemporal'].value;
    this.objHistoriaClinica.Masetero = this.dataFormGroup.controls['inputMasetero'].value;
    this.objHistoriaClinica.PterigoideoInterno = this.dataFormGroup.controls['inputPterigoideoInterno'].value;
    this.objHistoriaClinica.PterigoideoExterno = this.dataFormGroup.controls['inputPterigoideoExterno'].value;
    this.objHistoriaClinica.Digastrico = this.dataFormGroup.controls['inputDigastrico'].value;
    this.objHistoriaClinica.Esternocleidomastoideo = this.dataFormGroup.controls['inputEsternocleidomastoideo'].value;

    this.objHistoriaClinica.Trayectoria = this.dataFormGroup.controls['inpuTrayectoria'].value;
    this.objHistoriaClinica.RuidosAtm = this.dataFormGroup.controls['inputRuidos'].value;
    this.objHistoriaClinica.Palpacion = this.dataFormGroup.controls['inputPalapacion'].value;
    this.objHistoriaClinica.GradoApertura = this.dataFormGroup.controls['inputGradoApertura'].value;
    this.objHistoriaClinica.Ganglios = this.dataFormGroup.controls['inputGanglios'].value;

    this.objHistoriaClinica.LabiosComisuralabial = this.dataFormGroup.controls['inputLabiosComisura'].value;
    this.objHistoriaClinica.PaladarDuro = this.dataFormGroup.controls['inputPaladarDuro'].value;
    this.objHistoriaClinica.Cigarrillos = this.dataFormGroup.controls['inputCirgarrillos'].value;
    this.objHistoriaClinica.PisoBoca = this.dataFormGroup.controls['inputPisoBoca'].value;
    this.objHistoriaClinica.Lengua = this.dataFormGroup.controls['inputLengua'].value;
    this.objHistoriaClinica.Orofaringe = this.dataFormGroup.controls['inputOrofaringe'].value;
    this.objHistoriaClinica.Frenillos = this.dataFormGroup.controls['inputFrenillos'].value;
    this.objHistoriaClinica.Saliva = this.dataFormGroup.controls['inputSaliva'].value;

    this.objHistoriaClinica.ResumenAnamnesis = this.dataFormGroup.controls['inputResumenAnamnesis'].value;
    this.objHistoriaClinica.DiagnosticoIngreso = this.dataFormGroup.controls['inputDiagnosticoIngreso'].value;
    this.objHistoriaClinica.DetalleExamenAuxiliar = this.dataFormGroup.controls['inputExamenAuxiliar'].value;
    this.objHistoriaClinica.DiagnosticoSalida = this.dataFormGroup.controls['inputDiagnosticoSalida'].value;

  }

  Guardar() {
    for (let c in this.dataFormGroup.controls) {
      this.dataFormGroup.controls[c].markAsTouched();
    }

    if (this.dataFormGroup.valid) {
      this.AsignarValoresObjeto();
      if (this.tieneHistoria) {
        this.historiaService.Modificar(this.objHistoriaClinica)
          .subscribe({
            next: (data) => {
              if (data != null) {
                this.MostrarNotificacionSuccess('Se guardo con exito', '');
                this.CerrarModal();
              }
            },
            error: (e) => {
              console.log('Error: ', e);
            },
            complete: () => { }
          });
      }
      else {
        this.historiaService.Insertar(this.objHistoriaClinica)
          .subscribe({
            next: (data) => {
              if (data != null) {
                this.MostrarNotificacionSuccess('Se guardo con exito', '');
                this.CerrarModal();
              }
            },
            error: (e) => {
              console.log('Error: ', e);
            },
            complete: () => { }
          });
      }
    } else {
      this.MostrarNotificacionAlerta('Ingrese los campos necesarios');
    }
  }

  get Controls() {
    return this.dataFormGroup.controls;
  }


  MostrarNotificacionSuccess(mensaje: string, titulo: string) {
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje
    });
  }

  MostrarNotificacionAlerta(mensaje: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Historia',
      text: mensaje
    });
  }

}