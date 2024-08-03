import { Controller, Get, Middleware } from '@overnightjs/core';
import type { Request, Response } from 'express';

import { isAuthenticated } from '../middleware/auth';
import { OrganisationService } from '../services/organisationService';
import { handleServiceResponse } from '../util/httpHandlers';
import { ServiceResponse } from '../util/serviceResponse';

@Controller('api/organisations')
export class Organisations {
  @Get('')
  @Middleware([isAuthenticated])
  public async me(req: Request, res: Response) {
    const allOrganisations = await OrganisationService.all();

    if (!allOrganisations) {
      return handleServiceResponse(
        ServiceResponse.failure('No organisations found', null, 404),
        res
      );
    }

    return handleServiceResponse(allOrganisations, res);
  }

  @Get(':id')
  @Middleware([isAuthenticated])
  public async organisation(req: Request, res: Response) {
    const { id } = req.params;

    const organisation = await OrganisationService.id(Number(id));

    if (!organisation) {
      return handleServiceResponse(
        ServiceResponse.failure('Organisation not found', null, 404),
        res
      );
    }

    return handleServiceResponse(organisation, res);
  }
}
