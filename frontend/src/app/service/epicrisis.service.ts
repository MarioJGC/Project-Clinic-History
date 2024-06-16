import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { EpicrisisDTO } from '../dto/epicrisis.dto';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class EpicrisisService {
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

  ObtenerEpicrisis(IdHistoria: number) {
    return this.http.get<EpicrisisDTO>(`${API_URL}epicrisis/${IdHistoria}`);
  }

  public Insertar(data: EpicrisisDTO) {
    const url = `${API_URL}epicrisis`;
    return this.http.post(url, data, { headers: this.headers }).pipe(
      retry(this.nRetry),
      catchError(this.handleError)
    );
  }
  public Modificar(data: EpicrisisDTO) {
    const url = `${API_URL}epicrisis/${data.Id}`;
    return this.http.patch(url, data, { headers: this.headers }).pipe(
      retry(this.nRetry),
      catchError(this.handleError)
    );
  }

  sendData(data: EpicrisisDTO): Observable<any> {
    return this.http.patch(`${API_URL}epicrisis`, data);
  }

  update(data: EpicrisisDTO): Observable<any> {
    return this.http.patch(`${API_URL}epicrisis`, data);
  }

}