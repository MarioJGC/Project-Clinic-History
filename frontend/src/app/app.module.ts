import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaAtencionPacienteComponent } from './components/lista-atencion-paciente/lista-atencion-paciente.component';
import { ControlAtencionPacienteComponent } from './components/control-atencion-paciente/control-atencion-paciente.component';
import { PagesComponent } from './pages/pages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HistoriaClinicaComponent } from './components/historia-clinica/historia-clinica.component';
import { InterpretarExamenComponent } from './components/interpretar-examen/interpretar-examen.component';
import { NotasEvolutivasComponent } from './components/notas-evolutivas/notas-evolutivas.component';
import { EpicrisisComponent } from './components/epicrisis/epicrisis.component';
import { ConcentimientoComponent } from './components/concentimiento/concentimiento.component';
import { NotaComponent } from './components/nota/nota.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaAtencionPacienteComponent,
    ControlAtencionPacienteComponent,
    PagesComponent,
    HistoriaClinicaComponent,
    InterpretarExamenComponent,
    NotasEvolutivasComponent,
    EpicrisisComponent,
    ConcentimientoComponent,
    NotaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }