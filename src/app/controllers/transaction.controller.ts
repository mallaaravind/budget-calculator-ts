import { Context, Delete, dependency, Get, HttpResponseCreated, HttpResponseNotFound, HttpResponseOK, Log, Patch, Post, ValidateBody } from '@foal/core';
import { TransactionService } from '../services';

@Log('ApiController', {
    body: true,
    params: true,
    query: true
})
export class TransactionController {

    @dependency
    transactionSerice: TransactionService;

    @Get('/:id')
    async getTransactionById(ctx: Context) {
        const transaction = this.transactionSerice.getTransactionById(ctx.request.params.id);
        if (!transaction) {
            return new HttpResponseNotFound();
        }
        return new HttpResponseOK(await transaction);
    }

    @Get('/')
    async getTransactionsByUserId(ctx: Context) {
        const transactions = this.transactionSerice.getTransactionsByUserId(ctx.request.query.user_id);
        return new HttpResponseOK(await transactions);
    }

    @Post('/')
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
        required: ['userId', 'type', 'recurring_type', 'date', 'end_date', 'amount'],
        type: 'object',
    })
    async createTransaction(ctx: Context) {
        const requestBody = ctx.request.body;
        const transaction = this.transactionSerice.createTransaction(requestBody.userId, 
            requestBody.type, requestBody.recurring_type, requestBody.date, requestBody.end_date, requestBody.amount);
        return new HttpResponseCreated(await transaction);
    }

    @Patch('/:id')
    async patchTransaction(ctx: Context) {
        const requestBody = ctx.request.body;
        const transaction = this.transactionSerice.updateTransaction(ctx.request.params.id, requestBody.userId, 
            requestBody.type, requestBody.recurring_type, requestBody.date, requestBody.end_date, requestBody.amount);
        return new HttpResponseOK(await transaction);
    }

    @Delete('/:id')
    async deleteTransaction(ctx: Context) {
        this.transactionSerice.deleteTransaction(ctx.request.params.id);
        return new HttpResponseOK();
    }

}
