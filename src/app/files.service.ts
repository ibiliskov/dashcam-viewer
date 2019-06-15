import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../environments/environment'
import * as moment from 'moment'
import { LogStamp } from '../app/log-stamp'
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

  async getLogToArray (url: string): Promise<LogStamp[]> {
    let logArray: LogStamp[] = []
    let log: LogStamp
    const videoLogs = await this.http.get(url, { responseType: 'text' }).toPromise()
    const videoLogArray = videoLogs.split('\n')
    logArray = videoLogArray.map(
      (video): LogStamp => {
        video = video.replace(',', ' ')
        const videoLogProps = video.split(' ')
        log = {
          dateTime: new Date(`${videoLogProps.shift()} ${videoLogProps.shift()}`),
          latitude: parseFloat(videoLogProps.shift().substring(1)),
          longitude: parseFloat(videoLogProps.shift().substring(1)),
          speed: parseFloat(videoLogProps.shift()),
          speedUnit: videoLogProps.shift(),
        }

        return log
      }
    )

    return logArray
  }

  convertLogArrayToVtt (logArray): string {
    let vttConversion = 'WEBVTT'
    const startTime = moment.duration(
      logArray[0].dateTime
        .toLocaleTimeString()
        .split(' ')
        .shift()
    )
    for (let i = 0; i < logArray.length; i++) {
      if (i !== logArray.length - 1) {
        if (i === 0) {
          vttConversion += `\n\n00:00.000 --> ${moment(logArray[i + 1].dateTime)
            .subtract(startTime)
            .format('mm:ss.SSS')} \n${logArray[i].speed} ${logArray[i].speedUnit}`
        } else {
          vttConversion += `\n\n${moment(logArray[i].dateTime)
            .subtract(startTime)
            .format('mm:ss.SSS')} --> ${moment(logArray[i + 1].dateTime)
            .subtract(startTime)
            .format('mm:ss.SSS')} \n${logArray[i].speed} ${logArray[i].speedUnit}`
        }
      }
    }

    return vttConversion
  }
}
