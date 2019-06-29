import { Component, OnInit, NgModule, OnChanges, Input, SimpleChanges } from '@angular/core'
import { LogStamp } from '../log-stamp'
import { AgmCoreModule, MapsAPILoader } from '@agm/core'
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
  markerIcon

  constructor (private mapsAPILoader: MapsAPILoader) {}
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

    this.zoom = 15
    this.points = []
  }

  async ngOnChanges (changes: SimpleChanges): Promise<void> {
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
        await this.mapsAPILoader.load()

        if (!this.markerIcon) {
          this.markerIcon = {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 4,
            rotation: 0,
          }
        }
      }
    }
    if (changes.log && changes.log.currentValue) {
      this.updateMarkerPosition()
    }
  }

  updateMarkerPosition (): void {
    if (!(this.logs && this.logs.length > 0 || this.log)) {
      return
    }
    this.currentPosition.lat = this.log.latitude
    this.currentPosition.lng = this.log.longitude
    const nextLog = this.logs[this.logs.indexOf(this.log) + 1]
    if (!nextLog) {
      return
    }
    const currentPosition = new google.maps.LatLng(this.currentPosition.lat, this.currentPosition.lng)
    const nextPosition = new google.maps.LatLng(nextLog.latitude, nextLog.longitude)
    if (this.log.speed > 1) {
      this.markerIcon = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 4,
        rotation: Math.round(google.maps.geometry.spherical.computeHeading(currentPosition, nextPosition)),
      }
    }
  }
}
