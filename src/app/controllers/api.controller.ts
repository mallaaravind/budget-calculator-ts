import { Context, Get, HttpResponseOK, Log } from '@foal/core';

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

}
