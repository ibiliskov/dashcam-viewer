import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { VideoListComponent } from './video-list/video-list.component'
import { VideoPlayerComponent } from './video-player/video-player.component'
import {
  MatFormFieldModule,
  MatTableModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatRippleModule,
} from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule } from '@angular/common/http'
import { AgmCoreModule } from '@agm/core'
import { FileSizeModule } from 'ngx-filesize'
import { GoogleMapComponent } from './google-map/google-map.component'
import { SpeedChartComponent } from './speed-chart/speed-chart.component'
import { SummaryComponent } from './summary/summary.component'

@NgModule({
  declarations: [AppComponent, VideoListComponent, VideoPlayerComponent, GoogleMapComponent, SpeedChartComponent, SummaryComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    FileSizeModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['geometry'],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
