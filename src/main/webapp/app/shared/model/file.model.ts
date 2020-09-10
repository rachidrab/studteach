import { IClasse } from 'app/shared/model/classe.model';

export interface IFile {
  id?: number;
  name?: string;
  classe?: IClasse;
}

export class File implements IFile {
  constructor(public id?: number, public name?: string, public classe?: IClasse) {}
}
