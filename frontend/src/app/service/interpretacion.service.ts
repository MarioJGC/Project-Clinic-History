import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { InterpretacionDTO } from '../dto/interpretacion.dto';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class InterpretacionService {
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

  ObtenerInterpretacion(IdHistoria: number) {
    return this.http.get<InterpretacionDTO>(`${API_URL}interpretacion/${IdHistoria}`);
  }

  public Insertar(data: InterpretacionDTO) {
    const url = `${API_URL}interpretacion`;
    return this.http.post(url, data, { headers: this.headers }).pipe(
      retry(this.nRetry),
      catchError(this.handleError)
    );
  }
  
  public Modificar(data: InterpretacionDTO) {
    const url = `${API_URL}interpretacion/${data.Id}`;
    return this.http.patch(url, data, { headers: this.headers }).pipe(
      retry(this.nRetry),
      catchError(this.handleError)
    );
  }

  sendData(data: InterpretacionDTO): Observable<any> {
    return this.http.patch(`${API_URL}interpretacion`, data);
  }

  update(data: InterpretacionDTO): Observable<any> {
    return this.http.patch(`${API_URL}interpretacion`, data);
  }

}
