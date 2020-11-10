import { compodoc } from '../../interfaces/compodoc.interfaces';

export interface CompodocItem {
  name: string;
  id: string;
  file: string;
}
export type CompodocEntry = [keyof compodoc.Compodoc, CompodocItem[]];

export interface CompodocSection {
  section: keyof compodoc.Compodoc;
  items: CompodocItem[];
}
