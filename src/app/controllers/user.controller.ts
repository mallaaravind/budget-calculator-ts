import { Context, Delete, dependency, Get, HttpResponseCreated, HttpResponseNotFound, HttpResponseOK, Log, Patch, Post, ValidateBody, ValidatePathParam, ValidateQueryParam } from '@foal/core';
import { LogUserId } from '../hooks';
import { UserService } from '../services';

@Log('ApiController', {
    body: true,
    params: true,
    query: true
})
export class UserController {

    @dependency
    userService: UserService;

    @Get('/:id')
    @LogUserId()
    @ValidatePathParam('id', { type: 'integer' })
    async getUserById(ctx: Context) {
        const user = this.userService.getUserById(ctx.request.params.id);
        if (!user) {
            return new HttpResponseNotFound();
        }
        return new HttpResponseOK(await user);
    }

    @Get('/')
    @ValidateQueryParam('name', { type: 'string' }, { required: false })
    async getUsersByName(ctx: Context) {
        const users = this.userService.getUsersByName(ctx.request.query.name);
        return new HttpResponseOK(await users);
    }

    @Post('/')
    @ValidateBody({
        additionalProperties: false,
        properties: {
            name: { type: 'string' },
            dob: { type: 'string' }
        },
        required: ['name', 'dob'],
        type: 'object',
    })
    async createUser(ctx: Context) {
        const requestBody = ctx.request.body;
        const user = this.userService.createUser(requestBody.name, requestBody.dob);
        return new HttpResponseCreated((await user));
    }

    @Patch('/:id')
    @ValidatePathParam('id', { type: 'integer' })
    async patchUser(ctx: Context) {
        const requestBody = ctx.request.body;
        const user = this.userService.updateUser(ctx.request.params.id, requestBody.name, requestBody.dob);
        return new HttpResponseOK(await user);
    }

    @Delete('/:id')
    @ValidatePathParam('id', { type: 'integer' })
    async deleteUser(ctx: Context) {
        this.userService.deleteUser(ctx.request.params.id);
        return new HttpResponseOK();
    }

}
