import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { Inject, AutoWired } from 'typescript-ioc';
import { FrontendScopeApiService } from '../services/FrontendScopeApiService';
import { FrontendScopeApi } from '../models/FrontendScopeApi';

@Route('FrontendScopeApi')
@Security('jwt', ['admin:user:roles'])
@AutoWired
export class FrontendScopeApiController extends ControllerBase<any, FrontendScopeApiService> {
    @Inject
    protected serviceInstance!: FrontendScopeApiService;

    @Get()
    public getFrontendScopeApis(){
        return super.getAll();
    }

    @Get('{id}')
    public getFrontendScopeApiById(id: string){
        return super.getById(id);
    }

    @Post()
    public createFrontendScopeApi(@Body() model: FrontendScopeApi){
        return super.create(model);
    }

    @Put('{id}')
    public updateFrontendScopeApi(@Path() id: string, @Body() model: FrontendScopeApi) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteFrontendScopeApi(@Path() id:string){
        return super.delete(id);
    }
}
