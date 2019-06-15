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
  @Output() childEvent = new EventEmitter()
  constructor (private filesService: FilesService) {
    this.filesService.getVideoFiles().subscribe(
      (data): void => {
        this.videoData = data.children
        this.dataSource = new MatTableDataSource(this.videoData)
      }
    )

    this.displayedColumns = ['name', 'size', 'extension', 'type', 'videoUrl']
  }

  applyFilter (filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  onClick (video): void {
    this.childEvent.emit(video)
  }
}
