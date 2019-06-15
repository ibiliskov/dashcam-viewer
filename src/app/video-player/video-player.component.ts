import { Component, Input, Output, OnChanges, SimpleChanges, AfterViewInit, EventEmitter } from '@angular/core'
import videojs from 'video.js'
import { VideoFile, FilesService } from '../files.service'
import { environment } from '../../environments/environment'
import * as am4core from '@amcharts/amcharts4/core'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import am4themesKelly from '@amcharts/amcharts4/themes/kelly'
import { LogStamp } from '../log-stamp'

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
  title: string
  logArray: LogStamp[]
  url: string = `${environment.serverUrl}/files/`
  options: object = {
    controls: true,
    autoplay: true,
  }

  constructor (private filesService: FilesService) {}

  ngAfterViewInit (): void {
    this.player = videojs('my-video', this.options)
    this.player.hide()
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.video.currentValue.name !== '') {
      const tracks = this.player.remoteTextTracks()
      if (tracks.length) {
        for (let i = 0; i < tracks.length; i++) {
          this.logArray = []
          tracks.removeTrack(tracks[i])
        }
      }
      this.loadPlayerCaptions()
      this.player.show()
      this.player.pause()
      this.player.src(this.url + this.video.name)
      this.player.ready(
        (): void => {
          this.emitReadyLogs(this.logArray)
          tracks[0].on(
            'cuechange',
            (): void => {
              this.emitUpdateLog(this.logArray[tracks[0].activeCues[0].id])
            }
          )

          this.player.load()
        }
      )
    }
  }

  async loadPlayerCaptions (): Promise<void> {
    this.logArray = await this.filesService.getLogToArray(
      `${this.url + this.video.name.substring(0, this.video.name.lastIndexOf('.'))}.log`
    )
    this.title = this.filesService.convertLogArrayToVtt(this.logArray)
    this.player.addRemoteTextTrack(
      {
        default: true,
        kind: 'subtitles',
        srclang: 'en',
        label: 'English',
        src: URL.createObjectURL(new Blob([this.title], { type: 'text/plain' })),
      },
      true
    )
  }

  emitUpdateLog (log: LogStamp): void {
    this.updateLog.emit(log)
  }

  emitReadyLogs (logs: LogStamp[]): void {
    this.readyLogs.emit(logs)
  }
}
