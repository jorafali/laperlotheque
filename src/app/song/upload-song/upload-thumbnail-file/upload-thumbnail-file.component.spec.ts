import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadThumbnailFileComponent } from './upload-thumbnail-file.component';

describe('UploadThumbnailFileComponent', () => {
  let component: UploadThumbnailFileComponent;
  let fixture: ComponentFixture<UploadThumbnailFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadThumbnailFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadThumbnailFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
