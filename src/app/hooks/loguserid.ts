import { Hook } from '@foal/core';
import { LoggerService } from '../services';

export function LogUserId() {
  return Hook((ctx, services) => {
    const logger = services.get(LoggerService);
    logger.info(`UserId is: ${ctx.request.params.id}`);
  });
  
}
