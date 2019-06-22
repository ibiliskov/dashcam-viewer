import { Component, Input, Output, OnChanges, SimpleChanges, AfterViewInit, EventEmitter } from '@angular/core'
import videojs from 'video.js'
import { VideoFile, FilesService } from '../files.service'
import { environment } from '../../environments/environment'
import * as am4core from '@amcharts/amcharts4/core'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import am4themesKelly from '@amcharts/amcharts4/themes/kelly'
import { LogStamp } from '../log-stamp'
import { LogFileService } from '../log-file.service'

am4core.useTheme(am4themesKelly)
am4core.useTheme(am4themesAnimated)
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnChanges, AfterViewInit {
  @Input() video: VideoFile
  @Output() updateLog = new EventEmitter()
  @Output() readyLogs = new EventEmitter()
  player: videojs.Player
  url: string = `${environment.serverUrl}/files/`
  options: object = {
    controls: true,
    autoplay: true,
  }

  constructor (private filesService: FilesService, private logFileService: LogFileService) {}

  ngAfterViewInit (): void {
    this.player = videojs('my-video', this.options)
    this.player.hide()
  }

  async ngOnChanges (changes: SimpleChanges): Promise<void> {
    if (changes.video.currentValue.name !== '') {
      this.player.show()
      this.player.src(this.url + this.video.name)
      this.loadPlayerCaptions()
      this.player.ready(
        (): void => {
          this.player.load()
        }
      )
    }
  }

  loadPlayerCaptions (): void {
    this.filesService.getLogString(`${this.url + this.video.name.substring(0, this.video.name.lastIndexOf('.'))}.log`).subscribe(
      (logString): void => {
        const logStamps = this.logFileService.logFileToArray(logString)
        const vttSubtitle = this.logFileService.convertLogStampsToVtt(logStamps)
        this.emitReadyLogs(logStamps)

        const addedTrack = this.player.addRemoteTextTrack(
          {
            default: true,
            kind: 'metadata',
            srclang: 'en',
            label: 'English',
            src: URL.createObjectURL(new Blob([vttSubtitle], { type: 'text/plain' })),
          },
          false
        ).track

        addedTrack.addEventListener(
          'cuechange',
          (): void => {
            this.emitUpdateLog(logStamps[addedTrack.activeCues[0].id])
          }
        )
      }
    )
  }

  emitUpdateLog (logStamp: LogStamp): void {
    this.updateLog.emit(logStamp)
  }

  emitReadyLogs (logStamps: LogStamp[]): void {
    this.readyLogs.emit(logStamps)
  }
}
