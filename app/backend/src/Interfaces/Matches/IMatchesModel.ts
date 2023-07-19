import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findById(id: IMatches['id']): Promise<IMatches | null>
  matchesInProgress(inProgress: IMatches['inProgress']): Promise<IMatches[]>;
}
