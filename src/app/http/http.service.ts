import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public url: string = 'http://localhost:3001'

  Get(endpoint: string, bearer?: string): Observable<any> {
    return this.http.get(`${this.url}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${bearer}`,
        'Content-Type': 'application/json',
      },
    })
  }

  async get(endpoint: string, bearer?: string) {
    return await fetch(`${this.url}/${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${bearer}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
  }

  async put(endpoint: string, body?: any, bearer?: string) {
    try {
      return await fetch(`${this.url}/${endpoint}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${bearer}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
    } catch (error) {
      return error
    }
  }

  async post(endpoint: string, body?: any, bearer?: string) {
    try {
      return await fetch(`${this.url}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${bearer}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
    } catch (error) {
      return error
    }
  }
}
