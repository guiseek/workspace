import { SidenavSectionComponent } from './sidenav-section.component';
import { createMockFor } from '@customdoc/util/testing';


describe('SidenavSectionComponent', () => {
  let component: SidenavSectionComponent;

  beforeEach(() => {
    component = createMockFor(SidenavSectionComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
