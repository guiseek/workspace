import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewContainer } from './preview.container';

describe('PreviewContainer', () => {
  let component: PreviewContainer;
  let fixture: ComponentFixture<PreviewContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
