import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionContainer } from './interaction.container';

describe('InteractionContainer', () => {
  let component: InteractionContainer;
  let fixture: ComponentFixture<InteractionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
