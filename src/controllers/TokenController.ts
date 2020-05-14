import { Body, Delete, Get, Path, Post, Put, Query, Request, Route, Controller } from 'tsoa';
import { TokenService } from '../services/TokenService';
import { Security, getTokenCookie, extendTokenCookieExpiry, deleteTokenCookie } from '../authentication';
import { Request as KoaRequest } from 'koa';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('token')
@AutoWired
export class TokenController extends Controller {

    @Inject
    protected service!: TokenService;

    @Get()
    @Security('siteminder')
    public async getToken(@Request() request: KoaRequest): Promise<any> {
        // The request user is returned from siteminder, and used to populate the JWT token we use for role access
        let token = getTokenCookie(request);
        if (!token) {
            // The request user is returned from siteminder, and used to populate the JWT token we use for role access
          token = await this.service.generateToken(request.user);
        }
        return { token };
    }

    @Security('jwt')
    @Post('extendsession')
    public async extendSession(@Request() request: KoaRequest): Promise<any> {
        let token = getTokenCookie(request);
        if (token) {
            extendTokenCookieExpiry(request, token);
        }
    }

    @Security('jwt')
    @Post('delete')
    public async logout(@Request() request: KoaRequest): Promise<any> {
        deleteTokenCookie(request);
    }
}
