import { TestBed } from '@angular/core/testing'

import { LogFileService } from './log-file.service'

describe('LogFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: LogFileService = TestBed.get(LogFileService)
    expect(service).toBeTruthy()
  })
})
