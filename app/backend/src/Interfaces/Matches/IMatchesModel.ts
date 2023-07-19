import { IMatches } from './IMatches';
import { NewEntity } from '..';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findById(id: IMatches['id']): Promise<IMatches | null>
  matchesInProgress(inProgress: IMatches['inProgress']): Promise<IMatches[]>;
  endMatche(id: IMatches['id'], data: Partial<NewEntity<IMatches>>): Promise<IMatches | null>
}
