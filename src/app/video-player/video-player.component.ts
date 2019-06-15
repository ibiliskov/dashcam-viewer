import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core'
import videojs from 'video.js'
import { VideoFile } from '../files.service'
import { environment } from '../../environments/environment'

// https://www.arroyolabs.com/2017/03/angular-2-videojs-component/y

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnChanges, AfterViewInit {
  @Input() video: VideoFile
  player: videojs.Player
  show: boolean = true
  url: string = `${environment.serverUrl}/files/`
  options: object = {
    controls: true,
    autoplay: true,
  }

  constructor () {}
  ngAfterViewInit (): void {
    this.player = videojs('my-video', {})
    this.player.hide()
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.video.currentValue.name !== '') {
      this.player.show()
      this.player.pause()
      this.player.src(this.url + this.video.name)
      this.player.ready(
        (): void => {
          this.player.play()
        }
      )
    }
  }
}
