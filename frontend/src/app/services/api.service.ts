import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist, Artwork } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Artists
  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiUrl}/artists`);
  }

  getArtist(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/artists/${id}`);
  }

  createArtist(artist: Partial<Artist>): Observable<Artist> {
    return this.http.post<Artist>(`${this.apiUrl}/artists`, artist);
  }

  // Artworks
  getArtworks(artistId?: string): Observable<Artwork[]> {
    const url = artistId 
      ? `${this.apiUrl}/artworks?artistId=${artistId}`
      : `${this.apiUrl}/artworks`;
    return this.http.get<Artwork[]>(url);
  }

  getArtwork(id: string): Observable<Artwork> {
    return this.http.get<Artwork>(`${this.apiUrl}/artworks/${id}`);
  }

  uploadArtwork(formData: FormData): Observable<Artwork> {
    return this.http.post<Artwork>(`${this.apiUrl}/artworks`, formData);
  }

  likeArtwork(id: string): Observable<Artwork> {
    return this.http.post<Artwork>(`${this.apiUrl}/artworks/${id}/like`, {});
  }

  deleteArtwork(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/artworks/${id}`);
  }
}
