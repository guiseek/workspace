import { SidenavComponent } from './sidenav.component';
import { createMockFor } from '@customdoc/util/testing';

describe('SidenavComponent', () => {
  let component: SidenavComponent;

  beforeEach(() => {
    component = createMockFor(SidenavComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

