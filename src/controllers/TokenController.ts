import { Body, Delete, Get, Path, Post, Put, Query, Request, Route, Controller } from 'tsoa';
import { TokenService } from '../services/TokenService';
import { Security, setTokenCookie, getTokenCookie } from '../authentication';
import { Request as KoaRequest } from 'koa';

@Route('token')
export class TokenController extends Controller {

    get service() {
        return new TokenService();
    }

    @Get()
    @Security('siteminder')
    public async getToken(@Request() request: KoaRequest): Promise<any> {
        let token = getTokenCookie(request);
        if (!token) {
            token = await this.service.generateToken(request.user);
            setTokenCookie(request, token);
        }
        return { token };
    }

}