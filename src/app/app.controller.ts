import { controller, IAppController } from '@foal/core';
import { createConnection } from 'typeorm';

import { ApiController, UserController, TransactionController } from './controllers';

export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/api/users', UserController),
    controller('/api/transactions', TransactionController),
  ];

  async init() {
    await createConnection();
  }
}
