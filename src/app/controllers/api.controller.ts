import { Context, Delete, Get, HttpResponseCreated, HttpResponseNotFound, HttpResponseOK, Log, Patch, Post, ValidateBody } from '@foal/core';
import { Transaction, User } from '../entities';

@Log('ApiController', {
  body: true,
  // headers: [ 'X-CSRF-Token' ],
  params: true,
  query: true
})
export class ApiController {

  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK('Hello world!');
  }

  @Get('/users/:id')
  async getUserById(ctx: Context) {
    const user = await User.findOne({id: ctx.request.params.id});
    if(!user) {
      return new HttpResponseNotFound();
    }
    return new HttpResponseOK(user);
  }

  @Get('/users')
  async getUsersByName(ctx: Context) {
    console.log(ctx.request.query.name);
    if(ctx.request.query.name) {
      const users = await User.find({name: ctx.request.query.name});
      return new HttpResponseOK(users);
    }
    else {
      const users = await User.find();
      return new HttpResponseOK(users);
    }
  }

  @Post('/users/')
  @ValidateBody({
    additionalProperties: false,
    properties: {
      name: { type: 'string' },
      dob: { type: 'string' }
    },
    required: [ 'name' ],
    type: 'object',
  })
  async createUser(ctx: Context) {
    const user = new User();
    user.name = ctx.request.body.name;
    user.dob = ctx.request.body.dob;
    await user.save();
    return new HttpResponseCreated(user);
  }

  @Patch('/users/:id')
  async patchUser(ctx: Context) {
    const user = await User.preload({id: ctx.request.params.id, name: ctx.request.body.name, dob: ctx.request.body.dob});
    if(!user) {
      const newUser = new User();
      newUser.name = ctx.request.body.name;
      newUser.dob = ctx.request.body.dob;
      await newUser.save();
      return new HttpResponseCreated(newUser);
    }
    return new HttpResponseOK(user);
  }

  @Delete('/users/:id')
  async deleteUser(ctx: Context) {
    await User.delete({id: ctx.request.params.id});
    return new HttpResponseOK();
  }

  @Get('/transactions/:id')
  async getTransactionById(ctx: Context) {
    const transaction = await Transaction.findOne({id: ctx.request.params.id});
    if(!transaction) {
      return new HttpResponseNotFound();
    }
    return new HttpResponseOK(transaction);
  }

  @Get('/transactions')
  async getTransactionsByUserId(ctx: Context) {
    console.log(ctx.request.query.user_id);
    if(ctx.request.query.user_id) {
      const transactions = await Transaction.find({userId: ctx.request.query.user_id});
      return new HttpResponseOK(transactions);
    }
    return new HttpResponseOK();
  }

  @Post('/transactions/')
  @ValidateBody({
    additionalProperties: false,
    properties: {
      userId: { type: 'string' },
      type: { type: 'string' },
      recurring_type: { type: 'string' },
      date: { type: 'string' },
      end_date: { type: 'string' },
      amount: { type: 'number' }
    },
    required: [ 'userId', 'type', 'recurring_type', 'date', 'end_date', 'amount' ],
    type: 'object',
  })
  async createTransaction(ctx: Context) {
    const transaction = new Transaction();
    transaction.userId = ctx.request.body.userId;
    transaction.type = ctx.request.body.type;
    transaction.recurring_type = ctx.request.body.recurring_type;
    transaction.date = ctx.request.body.date;
    transaction.end_date = ctx.request.body.end_date;
    transaction.amount = ctx.request.body.amount;
    await transaction.save();
    return new HttpResponseCreated(transaction);
  }

  @Patch('/users/:id')
  async patchTransaction(ctx: Context) {
    const transaction = await Transaction.preload({
      id: ctx.request.params.id, 
      userId: ctx.request.body.userId, 
      type: ctx.request.body.type,
      recurring_type: ctx.request.body.recurring_type,
      date: ctx.request.body.date,
      end_date: ctx.request.body.end_date,
      amount: ctx.request.body.amount,
    });
    if(!transaction) {
      let newTransaction = new Transaction();
      newTransaction.userId = ctx.request.body.userId;
      newTransaction.type = ctx.request.body.type;
      newTransaction.recurring_type = ctx.request.body.recurring_type;
      newTransaction.date = ctx.request.body.date;
      newTransaction.end_date = ctx.request.body.end_date;
      newTransaction.amount = ctx.request.body.amount;
      await newTransaction.save();
      return new HttpResponseCreated(newTransaction);
    }
    return new HttpResponseOK(transaction);
  }

  @Delete('/transactions/:id')
  async deleteTransaction(ctx: Context) {
    await Transaction.delete({id: ctx.request.params.id});
    return new HttpResponseOK();
  }

}
