import { Controller, Post, Middleware } from '@overnightjs/core';
import type { Request, Response } from 'express';

import { type IJwt, isAuthenticated } from '../middleware/auth';
import { PokemonService } from '../services/pokemonService';
import { handleServiceResponse } from '../util/httpHandlers';
import { ServiceResponse } from '../util/serviceResponse';

@Controller('api/pokemon')
export class Pokemon {
  @Post('favorite/:id')
  @Middleware([isAuthenticated])
  public async favorite(req: Request, res: Response) {
    const { id } = req.params;
    const auth = res.locals.auth as IJwt;
    const userId = auth.userId;

    if (isNaN(Number(id))) {
      return handleServiceResponse(
        ServiceResponse.failure('Invalid id parameter', null, 400),
        res
      );
    }
    if (!id) {
      return handleServiceResponse(
        ServiceResponse.failure('Id not found', null, 400),
        res
      );
    }

    const pokemon = await PokemonService.favorite(Number(id), userId);

    if (!pokemon) {
      return handleServiceResponse(
        ServiceResponse.failure('Pokemon not found', null, 404),
        res
      );
    }

    return handleServiceResponse(pokemon, res);
  }
}
