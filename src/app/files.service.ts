import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../environments/environment'

export interface VideoFile {
  name: string
  size: number
  extension: string
  type: string
}
export interface Videos {
  children: VideoFile[]
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  _url: string = `${environment.serverUrl}/files/`
  constructor (private http: HttpClient) {}

  getVideoFiles (): Observable<Videos> {
    return this.http.get<Videos>(this._url)
  }
}
