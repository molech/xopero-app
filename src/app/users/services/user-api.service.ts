import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../types/user-models";

@Injectable({
  providedIn: "root",
})
export class UserApiService {
  private baseUrl = "https://jsonplaceholder.typicode.com";

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<User[]>(url);
  }

  addUser(userData: User): Observable<User> {
    const url = `${this.baseUrl}/users`;
    return this.http.post<User>(url, userData);
  }

  updateUser(userId: number, userData: User): Observable<User> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.patch<User>(url, userData);
  }
}
