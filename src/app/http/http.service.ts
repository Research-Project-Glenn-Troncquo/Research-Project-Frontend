import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor() {}

  public url: string = 'http://localhost:3001'

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
