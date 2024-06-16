import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListaAtencionPacienteComponent } from '../components/lista-atencion-paciente/lista-atencion-paciente.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: 'home', component: ListaAtencionPacienteComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }