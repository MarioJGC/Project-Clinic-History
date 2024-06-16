import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { EpicrisisDTO } from '../dto/epicrisis.dto';
import { HistoriaDTO } from '../dto/historia.dto';
import { NotasEvolutivasDTO } from '../dto/notas-evolutivas.dto';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class NotasEvolutivasService {
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

  ObtenerNotasEvolutivas(IdHistoria: number) {
    return this.http.get<NotasEvolutivasDTO[]>(`${API_URL}notas-evolutivas/${IdHistoria}`);
  }

  public Insertar(data: NotasEvolutivasDTO) {
    const url = `${API_URL}notas-evolutivas`;
    return this.http.post(url, data, { headers: this.headers }).pipe(
      retry(this.nRetry),
      catchError(this.handleError)
    );
  }

  public Modificar(data: NotasEvolutivasDTO) {
    const url = `${API_URL}notas-evolutivas/${data.Id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      retry(this.nRetry),
      catchError(this.handleError)
    );
  }

}