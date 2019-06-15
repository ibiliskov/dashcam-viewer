import { Component, OnInit, NgModule, OnChanges, Input, SimpleChanges } from '@angular/core'
import { LogStamp } from '../log-stamp'
import { AgmCoreModule } from '@agm/core'
import { LatLngLiteral } from '@agm/core/services/google-maps-types'

@NgModule({
  imports: [AgmCoreModule],
})
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, OnChanges {
  showMap: boolean = false
  startingPosition: LatLngLiteral
  currentPosition: LatLngLiteral
  zoom: number
  points: LatLngLiteral[]
  constructor () {}
  @Input() log: LogStamp
  @Input() logs: LogStamp[]
  ngOnInit (): void {
    this.startingPosition = {
      lat: 0,
      lng: 0,
    }
    this.currentPosition = {
      lat: 0,
      lng: 0,
    }
    this.zoom = 17
    this.points = []
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes.logs) {
      if (this.logs) {
        this.startingPosition.lat = this.logs[0].latitude
        this.startingPosition.lng = this.logs[0].longitude
        this.currentPosition.lat = this.logs[0].latitude
        this.currentPosition.lng = this.logs[0].longitude
        this.showMap = true
        this.points = this.logs.map(
          (log): LatLngLiteral => ({
            lat: log.latitude,
            lng: log.longitude,
          })
        )
        this.logs = []
      }
    }
    if (changes.log && changes.log.currentValue) {
      this.currentPosition.lat = this.log.latitude
      this.currentPosition.lng = this.log.longitude
    }
  }
}
