import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { Inject, AutoWired } from 'typescript-ioc';
import { FrontendScopeService } from '../services/FrontendScopeService';
import { FrontendScope } from '../models/FrontendScope';

@Route('FrontendScope')
@Security('jwt')
@AutoWired
export class FrontendScopeController extends ControllerBase<any, FrontendScopeService> {
    @Inject
    protected serviceInstance!: FrontendScopeService;

    @Get()
    public getFrontendScopes(){
        return super.getAll();
    }

    @Get('{id}')
    public getFrontendScopeById(id: string){
        return super.getById(id);
    }

    @Post()
    public createFrontendScope(@Body() model: FrontendScope){
        return super.create(model);
    }

    @Put('{id}')
    public updateFrontendScope(@Path() id: string, @Body() model: FrontendScope) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteFrontendScope(@Path() id:string){
        return super.delete(id);
    }
}
