import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { Inject, AutoWired } from 'typescript-ioc';
import { UserService, UserQuery } from '../services/UserService';
import { User } from '../models/User';

@Route('User')
@Security('jwt')
@AutoWired
export class UserController extends ControllerBase<any, UserService> {
    @Inject
    protected serviceInstance!: UserService;

    @Get('me')
    public getCurrentUser(): User {
        const { token: {
            guid = '',
            displayName = '',
            type = '',
            userId = ''
        } = {} } = this.currentUser;
        // const user: User = { guid, displayName, type, userId };
        const user: User = {};
        return user;
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
        return super.getById(id);
    }

    @Security('jwt', ['users:manage'])
    @Post()
    public createUser(@Body() model: User) {
        return super.create(model);
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
}
