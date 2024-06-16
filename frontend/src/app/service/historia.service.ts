import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { EpicrisisDTO } from '../dto/epicrisis.dto';
import { HistoriaDTO } from '../dto/historia.dto';
import { HistoriaClinicaDTO } from '../dto/historia-general.dto';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {
  public nTimeout: number = 20000;
  public nRetry: number = 0;
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A ocurrido un error :', error.error.message);
    } else {
      console.error(
        'El servidor retornó el código, ' + error.status);
    }
    return throwError(() => error.error);
  };

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private http: HttpClient) { }

  ObtenerHistoria() {
    return this.http.get<HistoriaDTO[]>(`${API_URL}historia`);
  }

  ObtenerHistoriaCompleta(IdHistoria: number) {
    return this.http.get<HistoriaClinicaDTO>(`${API_URL}historia/${IdHistoria}`);
  }

  public Insertar(data: HistoriaClinicaDTO) {
    const url = `${API_URL}historia`;
    return this.http.post(url, data, { headers: this.headers }).pipe(
      retry(this.nRetry),
      catchError(this.handleError)
    );
  }

  public Modificar(data: HistoriaClinicaDTO) {
    const url = `${API_URL}historia/${data.IdHistoria}`;
    return this.http.patch(url, data, { headers: this.headers }).pipe(
      retry(this.nRetry),
      catchError(this.handleError)
    );
  }
}