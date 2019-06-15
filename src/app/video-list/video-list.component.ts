import { Component } from '@angular/core'
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

  constructor (private filesService: FilesService) {
    this.dataSource = new MatTableDataSource(filesService.getVideoFiles())
    this.displayedColumns = ['position', 'name', 'weight', 'symbol']
  }

  applyFilter (filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
