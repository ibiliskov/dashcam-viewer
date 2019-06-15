import { Component, Output, EventEmitter } from '@angular/core'
import { MatTableDataSource } from '@angular/material'
import { FilesService, VideoFile } from '../files.service'
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent {
  dataSource: MatTableDataSource<VideoFile>
  displayedColumns: string[]
  videoData: VideoFile[]
  videoFormats: string[] = ['.mp4', '.avi', '.mov', '.flv', '.wmv']
  @Output() childEvent = new EventEmitter()
  constructor (private filesService: FilesService) {
    this.filesService.getVideoFiles().subscribe(
      (data): void => {
        this.videoData = data.children
        this.videoData = this.videoData.filter((video) => this.videoFormats.includes(video.extension))
        this.dataSource = new MatTableDataSource(this.videoData)
      }
    )

    this.displayedColumns = ['name', 'size']
  }

  applyFilter (filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  onClick (video): void {
    this.childEvent.emit(video)
  }
}
