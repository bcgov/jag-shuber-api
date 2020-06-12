import * as koa from 'koa';
import { Body, Delete, Get, Path, Post, Put, Query, Route, Request, Response } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { Inject, AutoWired } from 'typescript-ioc';
import { UserService, UserQuery } from '../services/UserService';
import { User } from '../models/User';

// import multer from 'multer';

// const upload = multer({ dest: 'uploads/' }); // note you can pass `multer` options here

@Route('User')
@Security('jwt')
@AutoWired
export class UserController extends ControllerBase<any, UserService> {
    @Inject
    protected serviceInstance!: UserService;

    @Get('me')
    public getCurrentUser() {
        const { token } = this.currentUser;
        // const user: User = { guid, displayName, type, userId };
        return this.service.getByToken(token);
    }

    @Get()
    public getUsers(
        @Query() locationId?: string) {
        return this.service.getAll(locationId);
    }

    @Get('search')
    public queryUsers(
        @Query() firstName?: string,
        @Query() lastName?: string,
        @Query() badgeNo?: number,
        @Query() sheriffRankCode?: string,
        @Query() locationId?: string,
        @Query() currentLocationId?: string,
        @Query() homeLocationId?: string) {

        const query: UserQuery = {
            firstName,
            lastName,
            badgeNo,
            sheriffRankCode,
            locationId,
            currentLocationId,
            homeLocationId
        } as UserQuery;

        return this.service.queryAll(query);
    }

    @Get('{id}')
    public getUserById(id: string) {
        // TODO: This is a quick n' dirty hack to grab the current user... need to fix these routes
        if (id === 'me') return this.getCurrentUser()
        return super.getById(id);
    }

    @Security('jwt', ['users:manage'])
    @Post()
    public createUser(@Body() model: User) {
        return super.create(model);
    }

    @Post('{id}/expire')
    public expireUser(@Path() id: string) {
        return this.service.expire(id);
    }

    @Post('{id}/unexpire')
    public unexpireUser(@Path() id: string) {
        return this.service.unexpire(id);
    }

    @Security('jwt', ['users:manage'])
    @Post('/expire')
    public expireUsers(@Body() ids:string[]) {
        if (ids.length > 0) {
            ids.forEach(id => this.service.expire(id));
        }
    }

    @Security('jwt', ['users:manage'])
    @Post('/unexpire')
    public unexpireUsers(@Body() ids:string[]) {
        if (ids.length > 0) {
            ids.forEach(id => this.service.unexpire(id));
        }
    }

    @Security('jwt', ['users:manage'])
    @Put('{id}')
    public updateUser(@Path() id: string, @Body() model: User) {
        return super.update(id,model);
    }

    @Security('jwt', ['users:manage'])
    @Delete('{id}')
    public deleteUser(@Path() id:string) {
        return super.delete(id);
    }

    @Security('jwt', ['users:manage'])
    @Post('/delete')
    public deleteUsers(@Body() ids:string[]) {
        if (ids.length > 0) {
            ids.forEach(id => super.delete(id));
        }
    }

    @Security('jwt', ['users:manage'])
    @Post('{id}/image')
    public uploadUserImage(@Path() id: string, @Request() request: koa.Request) {
        /* let imgUpload = upload.single('avatar');
        const ctx = request.ctx;
        const { req, res } = ctx;
        console.log('ctx.request.files', ctx.files);
        console.log('ctx.files', ctx.files);
        console.log('ctx.request.body', ctx.body);

        imgUpload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading!
              debugger;
            } else if (err) {
              // An unknown error occurred when uploading!
              debugger;
            }

            // Everything went fine
        }); */
    }
}
