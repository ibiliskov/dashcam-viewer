import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core'
import videojs from 'video.js'
import { VideoFile, FilesService } from '../files.service'
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnChanges, AfterViewInit {
  @Input() video: VideoFile
  player: videojs.Player
  show: boolean = true
  title: string
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
          tracks.removeTrack(tracks[i])
          this.loadPlayerCaptions()
        }
      } else {
        this.loadPlayerCaptions()
      }
      this.player.show()
      this.player.pause()
      this.player.src(this.url + this.video.name)
      this.player.ready(
        (): void => {
          this.player.load()
        }
      )
    }
  }

  async loadPlayerCaptions (): Promise<void> {
    const logArray = await this.filesService.getLogToArray(
      `${this.url + this.video.name.substring(0, this.video.name.lastIndexOf('.'))}.log`
    )
    this.title = this.filesService.convertLogArrayToVtt(logArray)
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
}
