import { IUser } from 'app/core/user/user.model';
import { IFile } from 'app/shared/model/file.model';

export interface IClasse {
  id?: number;
  name?: string;
  teacher?: IUser;
  studentArea?: IUser;
  files?: IFile[];
}

export class Classe implements IClasse {
  constructor(public id?: number, public name?: string, public teacher?: IUser, public studentArea?: IUser, public files?: IFile[]) {}
}
