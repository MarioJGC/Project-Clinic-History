import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { NotaDTO } from '../dto/nota.dto';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class NotaService {
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

  ObtenerNota(IdHistoria: number) {
    return this.http.get<NotaDTO>(`${API_URL}nota/${IdHistoria}`);
  }

  public Insertar(data: NotaDTO) {
    const url = `${API_URL}nota`;
    return this.http.post(url, data, { headers: this.headers }).pipe(
      retry(this.nRetry),
      catchError(this.handleError)
    );
  }
  public Modificar(data: NotaDTO) {
    const url = `${API_URL}nota/${data.Id}`;
    return this.http.patch(url, data, { headers: this.headers }).pipe(
      retry(this.nRetry),
      catchError(this.handleError)
    );
  }

  sendData(data: NotaDTO): Observable<any> {
    return this.http.patch(`${API_URL}nota`, data);
  }

  update(data: NotaDTO): Observable<any> {
    return this.http.patch(`${API_URL}nota`, data);
  }

}