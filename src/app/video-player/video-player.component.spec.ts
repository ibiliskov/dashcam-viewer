import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { VideoPlayerComponent } from './video-player.component'

describe('VideoPlayerComponent', (): void => {
  let component: VideoPlayerComponent
  let fixture: ComponentFixture<VideoPlayerComponent>

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [VideoPlayerComponent],
    })
    .compileComponents()
  }))

  beforeEach((): void => {
    fixture = TestBed.createComponent(VideoPlayerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', (): void => {
    expect(component).toBeTruthy()
  })
})
