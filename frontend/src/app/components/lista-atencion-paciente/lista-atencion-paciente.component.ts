import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ControlAtencionPacienteComponent } from '../control-atencion-paciente/control-atencion-paciente.component';
import { HistoriaService } from 'src/app/service/historia.service';
import { HistoriaDTO } from 'src/app/dto/historia.dto';

@Component({
  selector: 'app-lista-atencion-paciente',
  templateUrl: './lista-atencion-paciente.component.html',
  styleUrls: ['./lista-atencion-paciente.component.css']
})
export class ListaAtencionPacienteComponent {

  listadoHistoria: HistoriaDTO[] = [];

  constructor(private modalService: BsModalService,
    private historiaService: HistoriaService,
    private bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.ObtenerConfiguracion();
  }

  AbrirModal(historia: HistoriaDTO) {
    this.bsModalRef = this.modalService.show(ControlAtencionPacienteComponent, { backdrop: 'static', class: 'modal-md' });
    this.bsModalRef.content.AsignarInformacion(historia);
  }

  ObtenerConfiguracion() {
    this.historiaService.ObtenerHistoria()
      .subscribe({
        next: (data) => {
          if (data != null) {
            this.listadoHistoria = data;
          }
        },
        error: (e) => {
          console.log('Error: ', e);
        },
        complete: () => { }
      });
  }


}