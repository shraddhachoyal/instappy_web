import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { api_url } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
import { Register } from "./register";

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  constructor(private httpClient: HttpClient) { }
  private api_url = api_url;

  CreateUser(register: Register) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<Register[]>(this.api_url + 'v1/addContactForm/', register, httpOptions)
  }
}