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
  centerPosition: LatLngLiteral
  markerPosition: LatLngLiteral
  zoom: number
  points: LatLngLiteral[]
  markerIcon: google.maps.Symbol
  startMarkerIcon: google.maps.Symbol
  endMarkerIcon: google.maps.Symbol

  constructor (private mapsAPILoader: MapsAPILoader) {}
  @Input() log: LogStamp
  @Input() logs: LogStamp[]
  ngOnInit (): void {
    this.centerPosition = {
      lat: 0,
      lng: 0,
    }
    this.markerPosition = {
      lat: 0,
      lng: 0,
    }

    this.zoom = 15
    this.points = []
  }

  async ngOnChanges (changes: SimpleChanges): Promise<void> {
    if (changes.logs) {
      if (this.logs) {
        this.centerPosition.lat = this.logs[0].latitude
        this.centerPosition.lng = this.logs[0].longitude
        this.markerPosition.lat = this.logs[0].latitude
        this.markerPosition.lng = this.logs[0].longitude
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
            fillColor: '#3367D6',
            fillOpacity: 1,
            scale: 5,
            strokeColor: '#FFF',
            strokeWeight: 1,
            rotation: 0,
          }
        }
        this.startMarkerIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#3AC41B',
          fillOpacity: 1,
          scale: 5,
          strokeColor: '#FFF',
          strokeWeight: 1,
        }

        this.endMarkerIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#DD3C19',
          fillOpacity: 1,
          scale: 5,
          strokeColor: '#FFF',
          strokeWeight: 1,
        }
      }
    }
    if (changes.log && changes.log.currentValue) {
      await this.mapsAPILoader.load()
      this.updateMarkerPosition()
    }
  }

  updateMarkerPosition (): void {
    if (!(this.logs && this.logs.length > 0 || this.log)) {
      return
    }
    this.markerPosition.lat = this.log.latitude
    this.markerPosition.lng = this.log.longitude
    const nextLog = this.logs[this.logs.indexOf(this.log) + 1]
    if (!nextLog) {
      return
    }
    const currentPosition = new google.maps.LatLng(this.markerPosition.lat, this.markerPosition.lng)
    const nextPosition = new google.maps.LatLng(nextLog.latitude, nextLog.longitude)
    if (this.log.speed > 1) {
      this.markerIcon = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        fillColor: '#3367D6',
        fillOpacity: 1,
        scale: 5,
        strokeColor: '#FFF',
        strokeWeight: 1,
        rotation: Math.round(google.maps.geometry.spherical.computeHeading(currentPosition, nextPosition)),
      }
    }
  }

  centerMapAtCurrentLocation (): void {
    this.centerPosition.lat = this.markerPosition.lat
    this.centerPosition.lng = this.markerPosition.lng
  }
}
