import { Component } from '@angular/core'
import { VideoFile } from './files.service'
import { LogStamp } from '../app/log-stamp'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Eonon DashCam Viewer'

  videoFile: VideoFile = {
    name: '',
    size: 0,
    extension: '',
    type: '',
  }

  videoLog: LogStamp
  videoLogs: LogStamp[]
  maxSpeed: number
}
