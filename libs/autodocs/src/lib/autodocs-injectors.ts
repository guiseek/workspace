import { InjectionToken, Type } from '@angular/core';

export interface AutodocsConfig {
  components: Map<string, Type<any>>;
}

export const AUTODOCS_CONFIG = new InjectionToken<AutodocsConfig>(
  'AutodocsConfig'
);
