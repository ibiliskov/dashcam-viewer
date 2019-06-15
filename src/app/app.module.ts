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
} from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent, VideoListComponent, VideoPlayerComponent],
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
