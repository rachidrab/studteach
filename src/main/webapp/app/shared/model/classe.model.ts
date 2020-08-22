import { IUser } from 'app/core/user/user.model';

export interface IClasse {
  id?: number;
  name?: string;
  teacher?: IUser;
  studentArea?: IUser;
}

export class Classe implements IClasse {
  constructor(public id?: number, public name?: string, public teacher?: IUser, public studentArea?: IUser) {}
}
