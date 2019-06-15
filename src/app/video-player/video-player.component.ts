import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core'
import videojs from 'video.js'
import { VideoFile, FilesService } from '../files.service'
import { environment } from '../../environments/environment'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import am4themesDataviz from '@amcharts/amcharts4/themes/dataviz'
import { LogStamp } from '../log-stamp'

am4core.useTheme(am4themesDataviz)
am4core.useTheme(am4themesAnimated)
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnChanges, AfterViewInit {
  @Input() video: VideoFile
  player: videojs.Player
  hand: am4charts.ClockHand
  show: boolean = true
  title: string
  logArray: LogStamp[]
  url: string = `${environment.serverUrl}/files/`
  options: object = {
    controls: true,
    autoplay: true,
  }

  private chart: am4charts.GaugeChart
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
          this.chart.dispose()
          tracks.removeTrack(tracks[i])
        }
      }
      this.loadPlayerCaptions()
      this.createSpeedMeterChart()
      this.player.show()
      this.player.pause()
      this.player.src(this.url + this.video.name)
      this.player.ready(
        (): void => {
          tracks[0].on(
            'cuechange',
            (): void => {
              this.hand.showValue(this.logArray[tracks[0].activeCues[0].id].speed, 1000, am4core.ease.cubicOut)
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

  createSpeedMeterChart (): void {
    const chart = am4core.create('chartdiv', am4charts.GaugeChart)
    chart.hiddenState.properties.opacity = 0

    chart.innerRadius = -100

    const axis = chart.xAxes.push(new am4charts.ValueAxis() as any)
    axis.min = 0
    axis.max = 100
    axis.strictMinMax = true
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor('background')
    axis.renderer.grid.template.strokeOpacity = 0.3

    const colorSet = new am4core.ColorSet()

    const range0 = axis.axisRanges.create()
    range0.value = 0
    range0.endValue = 40
    range0.axisFill.fillOpacity = 1
    range0.axisFill.fill = colorSet.getIndex(0)
    range0.axisFill.zIndex = -1

    const range1 = axis.axisRanges.create()
    range1.value = 40
    range1.endValue = 80
    range1.axisFill.fillOpacity = 1
    range1.axisFill.fill = colorSet.getIndex(4)
    range1.axisFill.zIndex = -1

    const range2 = axis.axisRanges.create()
    range2.value = 80
    range2.endValue = 100
    range2.axisFill.fillOpacity = 1
    range2.axisFill.fill = colorSet.getIndex(2)
    range2.axisFill.zIndex = -1
    this.hand = chart.hands.push(new am4charts.ClockHand())
    this.chart = chart
  }
}
