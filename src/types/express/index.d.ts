import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/IUser.js';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }    
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type NoteModel = Model<INote & Document>;
  }
}