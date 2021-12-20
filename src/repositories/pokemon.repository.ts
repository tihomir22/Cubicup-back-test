import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {Pokemon, PokemonRelations} from '../models';

export class PokemonRepository extends DefaultCrudRepository<
  Pokemon,
  typeof Pokemon.prototype.name,
  PokemonRelations
> {
  constructor(@inject('datasources.local') dataSource: LocalDataSource) {
    super(Pokemon, dataSource);

    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified = new Date();
    });
  }
}
