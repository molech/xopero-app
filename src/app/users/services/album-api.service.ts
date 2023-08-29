import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Album, Photo } from "../types/album-models";

@Injectable({
  providedIn: "root",
})
export class AlbumApiService {
  private baseUrl = "https://jsonplaceholder.typicode.com";

  constructor(private http: HttpClient) {}

  fetchAlbums(userId: number): Observable<Album[]> {
    const url = `${this.baseUrl}/albums?userId=${userId}`;
    return this.http.get<Album[]>(url);
  }

  fetchPhotos(albumId: number): Observable<Photo[]> {
    const url = `${this.baseUrl}/photos?albumId=${albumId}`;
    return this.http.get<Photo[]>(url);
  }
}
