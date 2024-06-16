import { Component } from '@angular/core';
import { EpicrisisComponent } from '../epicrisis/epicrisis.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotasEvolutivasComponent } from '../notas-evolutivas/notas-evolutivas.component';
import { InterpretarExamenComponent } from '../interpretar-examen/interpretar-examen.component';
import { HistoriaClinicaComponent } from '../historia-clinica/historia-clinica.component';
import { HistoriaDTO } from 'src/app/dto/historia.dto';
import { ConcentimientoComponent } from '../concentimiento/concentimiento.component';
import { NotaComponent } from 'src/app/components/nota/nota.component';

@Component({
  selector: 'app-control-atencion-paciente',
  templateUrl: './control-atencion-paciente.component.html',
  styleUrls: ['./control-atencion-paciente.component.css']
})
export class ControlAtencionPacienteComponent {

  idHistoria: number = 0;
  objHistoria = new HistoriaDTO();
  esDocente: boolean = true;

  constructor(private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private bsModalOpenEpicrisis: BsModalRef,
    private bsModalOpenNotasEvolutivas: BsModalRef,
    private bsModalOpenInterpretarExamen: BsModalRef,
    private bsModalOpenHistoria: BsModalRef,
    private bsModalOpenNota: BsModalRef) { }

  AsignarInformacion(objHistoria: HistoriaDTO) {
    this.idHistoria = objHistoria.Id;
    this.objHistoria = objHistoria;
  }

  AbrirEpicrisis() {
    this.bsModalOpenEpicrisis = this.modalService.show(EpicrisisComponent, { backdrop: 'static', class: 'modal-xl' });
    this.bsModalOpenEpicrisis.content.AsignarInformacion(this.idHistoria);
  }

  AbrirNotaEvolutiva() {
    this.bsModalOpenNotasEvolutivas = this.modalService.show(NotasEvolutivasComponent, { backdrop: 'static', class: 'modal-xl' });
    this.bsModalOpenNotasEvolutivas.content.AsignarInformacion(this.idHistoria);
  }

  AbrirInterpretarExamen() {
    this.bsModalOpenInterpretarExamen = this.modalService.show(InterpretarExamenComponent, { backdrop: 'static', class: 'modal-xl' });
    this.bsModalOpenInterpretarExamen.content.AsignarInformacion(this.idHistoria);
  }

  AbrirHistoriaClinica() {
    this.bsModalOpenHistoria = this.modalService.show(HistoriaClinicaComponent, { backdrop: 'static', class: 'modal-xl' });
    this.bsModalOpenHistoria.content.AsignarInformacion(this.objHistoria);
  }


  AbrirConcentimiento() {
    this.bsModalOpenHistoria = this.modalService.show(ConcentimientoComponent, { backdrop: 'static', class: 'modal-xl' });
    this.bsModalOpenHistoria.content.AsignarInformacion(this.objHistoria);
  }

  AbrirNotas() {
    this.bsModalOpenNota = this.modalService.show(NotaComponent, { backdrop: 'static', class: 'modal-xl' });
    this.bsModalOpenNota.content.AsignarInformacion(this.idHistoria);
  }


  CerrarModal() {
    this.bsModalRef.hide();
  }

}