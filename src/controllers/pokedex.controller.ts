import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Pokemon} from '../models';
import {PokemonRepository} from '../repositories';

export class PokedexController {
  constructor(
    @repository(PokemonRepository)
    public pokemonRepository: PokemonRepository,
  ) {}

  @post('/pokemon', {
    responses: {
      '200': {
        description: 'Pokemon model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pokemon)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {
            title: 'NewPokemon',
          }),
        },
      },
    })
    pokemon: Pokemon,
  ): Promise<Pokemon> {
    return this.pokemonRepository.create(pokemon);
  }

  @get('/pokemon/count', {
    responses: {
      '200': {
        description: 'Pokemon model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Pokemon) where?: Where<Pokemon>): Promise<Count> {
    return this.pokemonRepository.count(where);
  }

  @get('/pokemon', {
    responses: {
      '200': {
        description: 'Array of Pokemon model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pokemon, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Pokemon) filter?: Filter<Pokemon>,
  ): Promise<Pokemon[]> {
    return this.pokemonRepository.find(filter);
  }

  @patch('/pokemon', {
    responses: {
      '200': {
        description: 'Pokemon PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {partial: true}),
        },
      },
    })
    pokemon: Pokemon,
    @param.where(Pokemon) where?: Where<Pokemon>,
  ): Promise<Count> {
    return this.pokemonRepository.updateAll(pokemon, where);
  }

  @get('/pokemon/{name}', {
    responses: {
      '200': {
        description: 'Pokemon model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pokemon, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('name') name: string,
    @param.filter(Pokemon, {exclude: 'where'})
    filter?: FilterExcludingWhere<Pokemon>,
  ): Promise<Pokemon> {
    return this.pokemonRepository.findById(name, filter);
  }

  @patch('/pokemon/{name}', {
    responses: {
      '204': {
        description: 'Pokemon PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('name') name: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pokemon, {partial: true}),
        },
      },
    })
    pokemon: Pokemon,
  ): Promise<void> {
    await this.pokemonRepository.updateById(name, pokemon);
  }

  @put('/pokemon/{name}', {
    responses: {
      '204': {
        description: 'Pokemon PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('name') name: string,
    @requestBody() pokemon: Pokemon,
  ): Promise<void> {
    await this.pokemonRepository.replaceById(name, pokemon);
  }

  @del('/pokemon/{name}', {
    responses: {
      '204': {
        description: 'Pokemon DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('name') name: string): Promise<void> {
    await this.pokemonRepository.deleteById(name);
  }
}
