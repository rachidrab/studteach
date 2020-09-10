import { IUser } from 'app/core/user/user.model';
import { IClasse } from 'app/shared/model/classe.model';
import { TypeDocument } from 'app/shared/model/enumerations/type-document.model';

export interface IDocument {
  id?: number;
  name?: string;
  type?: TypeDocument;
  teacher?: IUser;
  classe?: IClasse;
}

export class Document implements IDocument {
  constructor(public id?: number, public name?: string, public type?: TypeDocument, public teacher?: IUser, public classe?: IClasse) {}
}
