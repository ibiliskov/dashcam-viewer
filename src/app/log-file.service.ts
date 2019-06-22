import { Injectable } from '@angular/core'
import { LogStamp } from '../app/log-stamp'
import * as moment from 'moment'
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root',
})
export class LogFileService {
  constructor () {}

  logFileToArray (logString: string): LogStamp[] {
    const logFileRows: string[] = _.compact(logString.split(/\r?\n/))
    const logStamps: LogStamp[] = logFileRows.reduce((accumulator, logFileRow): LogStamp[] => {
      const logStampElements = logFileRow.split(/,| /)
      if (logStampElements.length === 6) {
        const logStamp: LogStamp = {
          dateTime: moment(`${logStampElements[0]} ${logStampElements[1]}`, ['MM-DD-YYYY', 'YYYY-MM-DD']).isValid()
            ? new Date(`${logStampElements[0]} ${logStampElements[1]}`)
            : null,
          longitude: parseFloat(logStampElements[2].substring(1)),
          latitude: parseFloat(logStampElements[3].substring(1)),
          speed: parseFloat(logStampElements[4]),
          speedUnit: logStampElements[5],
        }

        if (Object.values(logStamp).some((logStampValue): boolean => logStampValue !== null || !isNaN(logStampValue))) {
          accumulator.push(logStamp)
        }
      }

      return accumulator
    }, [])

    return logStamps
  }

  convertLogStampsToVtt (logStamps: LogStamp[]): string {
    let vttConversion = 'WEBVTT'
    const startTime = moment.duration(
      logStamps[0].dateTime
        .toLocaleTimeString()
        .split(' ')
        .shift()
    )
    for (let i = 0; i < logStamps.length; i++) {
      if (i !== logStamps.length - 1) {
        if (i === 0) {
          vttConversion += `\n\n0\n00:00.000 --> ${moment(logStamps[i + 1].dateTime)
            .subtract(startTime)
            .format('mm:ss.SSS')} \n${logStamps[i].latitude} ${logStamps[i].longitude} ${logStamps[i].speed} ${logStamps[i].speedUnit}`
        } else {
          vttConversion += `\n\n${i}\n${moment(logStamps[i].dateTime)
            .subtract(startTime)
            .format('mm:ss.SSS')} --> ${moment(logStamps[i + 1].dateTime)
            .subtract(startTime)
            .format('mm:ss.SSS')} \n${logStamps[i].latitude} ${logStamps[i].longitude} ${logStamps[i].speed} ${logStamps[i].speedUnit}`
        }
      }
    }

    return vttConversion
  }
}
