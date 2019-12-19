import { Body, Delete, Get, Path, Post, Put, Query, Request, Route, Controller } from 'tsoa';
import { TokenService } from '../services/TokenService';
import { Security, setTokenCookie, getTokenCookie, deleteTokenCookie } from '../authentication';
import { Request as KoaRequest } from 'koa';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('token')
@AutoWired
export class TokenController extends Controller {

    @Inject
    protected service!: TokenService;

    @Get()
    // @Security('siteminder')
    public async getToken(@Request() request: KoaRequest): Promise<any> {
        let token = getTokenCookie(request);
        if (!token) {
            token = await this.service.generateToken(request.user);
            setTokenCookie(request, token);
        }
        return { token };
    }

    @Post('delete')
    public async logout(@Request() request: KoaRequest): Promise<any> {
        deleteTokenCookie(request);
    }

}
