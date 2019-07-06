import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core'
import { LogStamp } from '../log-stamp'
import {} from 'googlemaps'
import { MapsAPILoader } from '@agm/core'

export interface RouteInfo {
  maxSpeed: number
  avgSpeed: number
  distance: number
}
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnChanges {
  @Input() logs: LogStamp[]
  @Output() maxSpeed = new EventEmitter()
  routeInfo: RouteInfo
  constructor (private mapsAPILoader: MapsAPILoader) {}

  async ngOnChanges (changes: SimpleChanges): Promise<void> {
    this.routeInfo = {
      maxSpeed: 0,
      avgSpeed: 0,
      distance: 0,
    }
    if (changes.logs) {
      if (changes.logs.currentValue) {
        await this.mapsAPILoader.load()
        const speedArray = this.logs.map((log): number => log.speed)
        const lngLatArray = this.logs.map((log): google.maps.LatLng => new google.maps.LatLng(log.latitude, log.longitude))
        this.routeInfo = {
          maxSpeed: Math.max(...speedArray),
          avgSpeed: speedArray.reduce((accumulator, currentValue): number => accumulator + currentValue) / speedArray.length,
          distance: google.maps.geometry.spherical.computeLength(lngLatArray) / 1000,
        }
        this.emitMaxSpeed(this.routeInfo.maxSpeed)
      }
    }
  }

  emitMaxSpeed (maxSpeed: number): void {
    this.maxSpeed.emit(maxSpeed)
  }
}
