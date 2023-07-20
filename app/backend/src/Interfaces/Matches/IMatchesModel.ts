import { IMatches } from './IMatches';
import { NewEntity } from '..';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findByQuery(inProgress: IMatches['inProgress']): Promise<IMatches[]>;
  findById(id: IMatches['id']): Promise<IMatches | null>
  endMatche(id: IMatches['id'], data: Partial<NewEntity<IMatches>>): Promise<IMatches | null>
  createMatch(data: Partial<IMatches>):Promise<IMatches>
}
