import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = environment.apiUrl; // Simulación con JSONPlaceholder

  constructor(private http: HttpClient) {}

  // Método para obtener una lista de recursos
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/posts`);
  }

  // Método para enviar datos al backend
  createPost(post: { title: string; body: string; userId: number }): Observable<any> {
    return this.http.post(`${this.API_URL}/posts`, post);
  }

  // Método para actualizar un recurso
  updatePost(id: number, post: { title?: string; body?: string }): Observable<any> {
    return this.http.put(`${this.API_URL}/posts/${id}`, post);
  }

  // Método para eliminar un recurso
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/posts/${id}`);
  }
}
