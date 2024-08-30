import * as express from 'express';
import { Post, Path, Request, Route, Security, SuccessResponse, Controller } from 'tsoa';
import { injectable } from 'tsyringe';

import { CommandHandler } from '../../base/domain/CommandHandler.js';
import { UserInitiator } from '../../base/domain/models/Initiator.js';
import { ApplyPreDealCommand } from '../../origination/application/commands/ApplyPreDealCommand.js';

@injectable()
@Route('/pre-deals')
export class PreDealsController extends Controller {
  constructor(
    private readonly commandHandler: CommandHandler,
  ) {
    super();
  }

  @Post('/{preDealId}/applications')
  @SuccessResponse('201', 'No content')
  @Security('user')
  public async updatePreDeal(
    @Path('preDealId') preDealId: string,
    @Request() request: express.Request,
  ): Promise<Record<string, never>> {
    const { sub: userId } = request.context.authUser;

    const input = {
      preDealId,
      userId,
    };

    await this.commandHandler.handle(ApplyPreDealCommand.build(input), UserInitiator.build(userId as string));

    return {};
  }
}

export default PreDealsController;
