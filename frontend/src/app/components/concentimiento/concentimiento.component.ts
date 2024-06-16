import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HistoriaDTO } from 'src/app/dto/historia.dto';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import { style } from '@angular/animations';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-concentimiento',
  templateUrl: './concentimiento.component.html',
  styleUrls: ['./concentimiento.component.css']
})
export class ConcentimientoComponent {

  dataFormGroup: FormGroup;
  fecha: string = moment().format('DD-MM-YYYY HH:mm:ss');
  numeroDocumento: string = '';
  nombreDoctor: string = '';
  nombreEnfermedad: string = '';
  procedimiento: string = '';
  tratamientos: string = '';
  consecuencias: string = '';
  seRealiza: string = '';

  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
  ) {
    this.dataFormGroup = new FormGroup({
    });
  }

  AsignarInformacion(objHistoria: HistoriaDTO) {

  }

  ngOnInit(): void { }

  get Controls() {
    return this.dataFormGroup.controls;
  }

  CerrarModal() {
    this.bsModalRef.hide();
  }

  Imprimir() {
    var dd = {
      content: [
        {
          text: 'CONSENTIMIENTO INFORMADO\n\n',
          style: 'header'
        },
        {
          text: [
            { text: 'Fecha: ' + this.fecha + '', fontSize: 15, bold: true },
            '\n\n'
          ]
        },
        {
          style: 'bigger',
          italics: false,
          text: [
            'Yo identificado con DNI (carnet de extranjería o pasaporte para extranjeros) N° ' + this.numeroDocumento + '  he sido informado por el Dr. ' + this.nombreDoctor + ' acerca de mi enfermedad, los estudios y tratamientos que se requiere.',
            '\n\nPadezco de ' + this.nombreEnfermedad + '  y el tratamiento o procedimiento propuesto consiste en (descripción en términos sencillos) ' + this.procedimiento + '.',
            '\n\nMe ha informado de los riesgos, ventajas y beneficios del procedimiento, asi como sobre la posibilidad de tratamientos alternativos ' + this.tratamientos + ' y se ha referido a las consecuencias del no tratamiento ' + this.consecuencias + '.  He realizado las preguntas que considere oportunas, todas las cuales han sido absueltas y con respuestas que considero suficientes y aceptables.',
            '\n\nPor lo tanto, en forma conciente y voluntaria doy mi consentimiento para que se me realice ' + this.seRealiza + '. Teniendo pleno conocimiento de los posibles riesgos, complicaciones y beneficios que podrían desprenderse de dicho acto.',
          ]
        },
        {
          text: '\n\n\n\n\n\n\n___________________________\nFirma del paciente\n\n\n\n\n\n\n___________________________\nFirma de un testigo\n\n\n\n\n\n\n___________________________\nFirma del profesional',
          //alignment: 'center',
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        bigger: {
          fontSize: 15,
          italics: true
        }
      }

    }

    // Crear el PDF y abrirlo en una nueva ventana
    pdfMake.createPdf(dd).getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });

  }


}