import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsContainer } from './components.container';

describe('ComponentsContainer', () => {
  let component: ComponentsContainer;
  let fixture: ComponentFixture<ComponentsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
