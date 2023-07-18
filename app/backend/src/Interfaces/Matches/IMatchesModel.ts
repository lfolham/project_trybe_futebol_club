import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findById(id: IMatches['id']): Promise<IMatches | null>
}
