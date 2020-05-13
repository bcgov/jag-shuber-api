/*
 ______  ______  ______  ______  ______  ______  ______  ______  ______  ______  ______ 
|______||______||______||______||______||______||______||______||______||______||______|
  ___          _                  _____                                 _             _ 
 / _ \        | |                |  __ \                               | |           | |
/ /_\ \ _   _ | |_  ___          | |  \/  ___  _ __    ___  _ __  __ _ | |_  ___   __| |
|  _  || | | || __|/ _ \         | | __  / _ \| '_ \  / _ \| '__|/ _` || __|/ _ \ / _` |
| | | || |_| || |_| (_) |        | |_\ \|  __/| | | ||  __/| |  | (_| || |_|  __/| (_| |
\_| |_/ \__,_| \__|\___/          \____/ \___||_| |_| \___||_|   \__,_| \__|\___| \__,_|
______                 _   _         _             ___  ___            _  _   __        
|  _  \               | \ | |       | |            |  \/  |           | |(_) / _|       
| | | | ___           |  \| |  ___  | |_           | .  . |  ___    __| | _ | |_  _   _ 
| | | |/ _ \          | . ` | / _ \ | __|          | |\/| | / _ \  / _` || ||  _|| | | |
| |/ /| (_) |         | |\  || (_) || |_           | |  | || (_) || (_| || || |  | |_| |
|___/  \___/          \_| \_/ \___/  \__|          \_|  |_/ \___/  \__,_||_||_|   \__, |
                                                                                   __/ |
                                                                                  |___/ 
 ______  ______  ______  ______  ______  ______  ______  ______  ______  ______  ______ 
|______||______||______||______||______||______||______||______||______||______||______|

Client is generated from swagger.json file
*/
import * as superAgent from "superagent";
import { TOKEN_COOKIE_NAME, SMSESSION_COOKIE_NAME } from '../common/authentication';
import { TypedEvent } from '../common/TypedEvent';
import { retreiveCookieValue } from '../common/cookieUtils';
import { decodeJwt } from '../common/tokenUtils';
import { 

    User,
    UserRole,
    Role,
    RolePermission,
    ApiScope,
    FrontendScope,
    FrontendScopePermission,
    FrontendScopeApi,
    RoleApiScope,
    RoleFrontendScope,
    Assignment,
    Region,
    Location,
    Sheriff,
    Courtroom,
    JailRoleCode,
    OtherAssignCode,
    WorkSectionCode,
    SheriffRankCode,
    EscortRun,
    Shift,
    MultipleShiftUpdateRequest,
    ShiftCopyOptions,
    DutyRecurrence,
    Duty,
    DutyImportDefaultsRequest,
    SheriffDuty,
    SheriffDutyAutoAssignRequest,
    SheriffLocation,
    Leave,
    LeaveCancelReasonCode,
    LeaveCode,
    LeaveSubCode,
    CourtRoleCode,
    GenderCode 
} from "./models"


export default class Client {
    private _previousToken:string | undefined | null = null;
    private _tokenChangedEvent = new TypedEvent<string|undefined>();
    /**
     * An event that is fired when the app token associated with this client
     * has changed.
     *
     * @readonly
     * @type {TypedEvent<string|undefined>}
     * @memberof Client
     */
    public get onTokenChanged() : TypedEvent<string|undefined> {
        return this._tokenChangedEvent;
    }
    
    /**
     * A hook to allow errors occured to be processed further before being thrown
     * out of the api client. This is useful for modifying validation errors etc.
     *
     * @memberof Client
     */
    public errorProcessor: (error:any) => Error = (e)=>e;
    
    constructor(private _agent:superAgent.SuperAgent<any> = superAgent.agent()){
    }

    /**ftkj
     * Returns the underlying SuperAgent instance being used for requests
     *
     * @readonly
     * @memberof Client
     */
    get agent() {
        return this._agent;
    }

    /**
     * Hook responsible for extracting the value out of the response
     *
     * @protected
     * @template T
     * @param {superAgent.Response} response
     * @returns {T}
     * @memberof Client
     */
    protected handleResponse<T>(response:superAgent.Response):T {
        return response.body as T;
    }

    /**
     * Ensures that a application token currently exists and fetches a new one
     * if the old one has expired or is not present.
     *
     * @protected
     * @returns {Promise<void>}
     * @memberof Client
     */
    protected async ensureToken(): Promise<void> {
        console.log('Ensuring token exists...')
        
        let smsessionCookie = retreiveCookieValue(SMSESSION_COOKIE_NAME, this.agent);
        console.log('DUMP SMSESSION Cookie value');
        console.log(smsessionCookie);

        let token = retreiveCookieValue(TOKEN_COOKIE_NAME, this.agent);

        console.log('Token retrieved from cookie:');
        console.log(decodeJwt(token));
        // If there is no token, we will go out and retreive one
        if (token == undefined) {
            try {
                console.log('Fetching new token');
                await this.GetToken();
            } catch(e) {                
                console.error("Couldn't fetch token",e);
            }
        }
    }

    /**
     * Takes a token and handles emitting events if the token has changed
     *
     * @protected
     * @param {string} [tokenString]
     * @memberof Client
     */
    protected handleNewToken(token?:string){
        if(token !== this._previousToken){
            this._previousToken = token;
            this.onTokenChanged.emit(token);
        }
    }

    /**
     * All operations in the client are routed through this method which
     * is responsible for issuing and handling responses in a way which 
     * errors can be captured and processed within the client. 
     * This method also ensures that a client token exists before issuing the
     * request.
     *
     * @protected
     * @template T
     * @param {() => Promise<superAgent.Response>} worker
     * @returns {Promise<T>}
     * @memberof Client
     */
    protected async tryRequest<T>(worker: () => Promise<superAgent.Response>) : Promise<T> {
        try {
            await this.ensureToken();
            const response = await worker();
            return this.handleResponse(response);
        } catch (error) {
            if (this.errorProcessor) {
                throw this.errorProcessor(error);
            } else {
                throw error;
            }
        }
    }

    public async GetToken():Promise<any>{
        // For getting the token, we need to bypass the tryRequest as 
        // it will ensure token which will call this method again
        try{
            const response: superAgent.Response = await this.agent.get(`/token`)
            const { token:tokenString } = this.handleResponse<{ token: string }>(response);
            this.handleNewToken(tokenString);
            return tokenString;
        }catch(e){
            this.handleNewToken();
            throw e;
        }
    }    
    public async ExtendSession():Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.post(`/token/extendsession`)
            return response;
        });
    }    
    public async Logout():Promise<any>{
        await this.agent.post(`/token/delete`)
        this.handleNewToken();
    }    
    public async GetCurrentUser():Promise<User>{
        return this.tryRequest<User>(async () => {
            const response: superAgent.Response = await this.agent.get(`/User/me`)
            return response;
        });
    }    
    public async GetUsers( locationId:string ):Promise<any>{
        const params = { 
            "locationId":locationId 
        };
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/User`)
                .query(params)
            return response;
        });
    }    
    public async CreateUser( model:User ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.post(`/User`)
                .send(model)
            return response;
        });
    }    
    public async QueryUsers( firstName:string , lastName:string , badgeNo:number , sheriffRankCode:string , locationId:string , currentLocationId:string , homeLocationId:string ):Promise<any>{
        const params = { 
            "firstName":firstName,
            "lastName":lastName,
            "badgeNo":badgeNo,
            "sheriffRankCode":sheriffRankCode,
            "locationId":locationId,
            "currentLocationId":currentLocationId,
            "homeLocationId":homeLocationId 
        };
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/User/search`)
                .query(params)
            return response;
        });
    }    
    public async GetUserById( id:string ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/User/${id}`)
            return response;
        });
    }    
    public async UpdateUser( id:string , model:User ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.put(`/User/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteUser( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/User/${id}`)
            return response;
        });
    }    
    public async ExpireUser( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/User/${id}/expire`)
            return response;
        });
    }    
    public async UnexpireUser( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/User/${id}/unexpire`)
            return response;
        });
    }    
    public async ExpireUsers( ids:Array<string> ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/User/expire`)
                .send(ids)
            return response;
        });
    }    
    public async UnexpireUsers( ids:Array<string> ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/User/unexpire`)
                .send(ids)
            return response;
        });
    }    
    public async DeleteUsers( ids:Array<string> ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/User/delete`)
                .send(ids)
            return response;
        });
    }    
    public async UploadUserImage( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/User/${id}/image`)
            return response;
        });
    }    
    public async GetCurrentUserRoles():Promise<Array<any>>{
        return this.tryRequest<Array<any>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/UserRole/me`)
            return response;
        });
    }    
    public async GetUserRoles( locationId:string , startDate:string , endDate:string ):Promise<Array<UserRole>>{
        const params = { 
            "locationId":locationId,
            "startDate":startDate,
            "endDate":endDate 
        };
        return this.tryRequest<Array<UserRole>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/UserRole`)
                .query(params)
            return response;
        });
    }    
    public async CreateUserRole( model:UserRole ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.post(`/UserRole`)
                .send(model)
            return response;
        });
    }    
    public async GetUserRoleById( id:string ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/UserRole/${id}`)
            return response;
        });
    }    
    public async UpdateUserRole( id:string , model:UserRole ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.put(`/UserRole/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteUserRole( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/UserRole/${id}`)
            return response;
        });
    }    
    public async ExpireUserRole( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/UserRole/${id}/expire`)
            return response;
        });
    }    
    public async UnexpireUserRole( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/UserRole/${id}/unexpire`)
            return response;
        });
    }    
    public async ExpireUserRoles( ids:Array<string> ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/UserRole/expire`)
                .send(ids)
            return response;
        });
    }    
    public async UnexpireUserRoles( ids:Array<string> ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/UserRole/unexpire`)
                .send(ids)
            return response;
        });
    }    
    public async DeleteUserRoles( ids:Array<string> ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/UserRole/delete`)
                .send(ids)
            return response;
        });
    }    
    public async GetRoles():Promise<Array<any>>{
        return this.tryRequest<Array<any>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Role`)
            return response;
        });
    }    
    public async CreateRole( model:Role ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Role`)
                .send(model)
            return response;
        });
    }    
    public async GetRoleById( id:string ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Role/${id}`)
            return response;
        });
    }    
    public async UpdateRole( id:string , model:Role ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.put(`/Role/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteRole( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/Role/${id}`)
            return response;
        });
    }    
    public async GetRolePermissions():Promise<Array<any>>{
        return this.tryRequest<Array<any>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/RolePermission`)
            return response;
        });
    }    
    public async CreateRolePermission( model:RolePermission ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.post(`/RolePermission`)
                .send(model)
            return response;
        });
    }    
    public async GetRolePermissionById( id:string ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/RolePermission/${id}`)
            return response;
        });
    }    
    public async UpdateRolePermission( id:string , model:RolePermission ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.put(`/RolePermission/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteRolePermission( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/RolePermission/${id}`)
            return response;
        });
    }    
    public async GetApiScopes():Promise<Array<any>>{
        return this.tryRequest<Array<any>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/ApiScope`)
            return response;
        });
    }    
    public async CreateApiScope( model:ApiScope ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.post(`/ApiScope`)
                .send(model)
            return response;
        });
    }    
    public async GetApiScopeById( id:string ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/ApiScope/${id}`)
            return response;
        });
    }    
    public async UpdateApiScope( id:string , model:ApiScope ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.put(`/ApiScope/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteApiScope( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/ApiScope/${id}`)
            return response;
        });
    }    
    public async GetFrontendScopes():Promise<Array<any>>{
        return this.tryRequest<Array<any>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/FrontendScope`)
            return response;
        });
    }    
    public async CreateFrontendScope( model:FrontendScope ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.post(`/FrontendScope`)
                .send(model)
            return response;
        });
    }    
    public async GetFrontendScopeById( id:string ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/FrontendScope/${id}`)
            return response;
        });
    }    
    public async UpdateFrontendScope( id:string , model:FrontendScope ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.put(`/FrontendScope/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteFrontendScope( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/FrontendScope/${id}`)
            return response;
        });
    }    
    public async GetFrontendScopePermissions():Promise<Array<any>>{
        return this.tryRequest<Array<any>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/FrontendScopePermission`)
            return response;
        });
    }    
    public async CreateFrontendScopePermission( model:FrontendScopePermission ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.post(`/FrontendScopePermission`)
                .send(model)
            return response;
        });
    }    
    public async GetFrontendScopePermissionById( id:string ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/FrontendScopePermission/${id}`)
            return response;
        });
    }    
    public async UpdateFrontendScopePermission( id:string , model:FrontendScopePermission ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.put(`/FrontendScopePermission/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteFrontendScopePermission( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/FrontendScopePermission/${id}`)
            return response;
        });
    }    
    public async GetFrontendScopeApis():Promise<Array<any>>{
        return this.tryRequest<Array<any>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/FrontendScopeApi`)
            return response;
        });
    }    
    public async CreateFrontendScopeApi( model:FrontendScopeApi ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.post(`/FrontendScopeApi`)
                .send(model)
            return response;
        });
    }    
    public async GetFrontendScopeApiById( id:string ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/FrontendScopeApi/${id}`)
            return response;
        });
    }    
    public async UpdateFrontendScopeApi( id:string , model:FrontendScopeApi ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.put(`/FrontendScopeApi/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteFrontendScopeApi( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/FrontendScopeApi/${id}`)
            return response;
        });
    }    
    public async GetRoleApiScopes():Promise<Array<any>>{
        return this.tryRequest<Array<any>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/RoleApiScope`)
            return response;
        });
    }    
    public async CreateRoleApiScope( model:RoleApiScope ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.post(`/RoleApiScope`)
                .send(model)
            return response;
        });
    }    
    public async GetRoleApiScopeById( id:string ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/RoleApiScope/${id}`)
            return response;
        });
    }    
    public async UpdateRoleApiScope( id:string , model:RoleApiScope ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.put(`/RoleApiScope/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteRoleApiScope( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/RoleApiScope/${id}`)
            return response;
        });
    }    
    public async GetRoleFrontendScopes():Promise<Array<any>>{
        return this.tryRequest<Array<any>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/RoleFrontendScope`)
            return response;
        });
    }    
    public async CreateRoleFrontendScope( model:RoleFrontendScope ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.post(`/RoleFrontendScope`)
                .send(model)
            return response;
        });
    }    
    public async GetRoleFrontendScopeById( id:string ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/RoleFrontendScope/${id}`)
            return response;
        });
    }    
    public async UpdateRoleFrontendScope( id:string , model:RoleFrontendScope ):Promise<any>{
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.put(`/RoleFrontendScope/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteRoleFrontendScope( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/RoleFrontendScope/${id}`)
            return response;
        });
    }    
    public async GetAssignments( locationId:string , startDate:string , endDate:string ):Promise<Array<Assignment>>{
        const params = { 
            "locationId":locationId,
            "startDate":startDate,
            "endDate":endDate 
        };
        return this.tryRequest<Array<Assignment>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Assignments`)
                .query(params)
            return response;
        });
    }    
    public async CreateAssignment( model:Assignment ):Promise<Assignment>{
        return this.tryRequest<Assignment>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Assignments`)
                .send(model)
            return response;
        });
    }    
    public async GetAssignmentById( id:string ):Promise<Assignment>{
        return this.tryRequest<Assignment>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Assignments/${id}`)
            return response;
        });
    }    
    public async UpdateAssignment( id:string , model:Assignment ):Promise<Assignment>{
        return this.tryRequest<Assignment>(async () => {
            const response: superAgent.Response = await this.agent.put(`/Assignments/${id}`)
                .send(model)
            return response;
        });
    }    
    public async ExpireAssignment( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Assignments/${id}`)
            return response;
        });
    }    
    public async DeleteAssignment( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/Assignments/${id}`)
            return response;
        });
    }    
    public async GetRegions():Promise<Array<Region>>{
        return this.tryRequest<Array<Region>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/regions`)
            return response;
        });
    }    
    public async CreateRegion( model:Region ):Promise<Region>{
        return this.tryRequest<Region>(async () => {
            const response: superAgent.Response = await this.agent.post(`/regions`)
                .send(model)
            return response;
        });
    }    
    public async GetRegionById( id:string ):Promise<Region>{
        return this.tryRequest<Region>(async () => {
            const response: superAgent.Response = await this.agent.get(`/regions/${id}`)
            return response;
        });
    }    
    public async UpdateRegion( id:string , model:Region ):Promise<Region>{
        return this.tryRequest<Region>(async () => {
            const response: superAgent.Response = await this.agent.put(`/regions/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteRegion( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/regions/${id}`)
            return response;
        });
    }    
    public async GetLocations():Promise<Array<Location>>{
        return this.tryRequest<Array<Location>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/locations`)
            return response;
        });
    }    
    public async CreateLocation( model:Location ):Promise<Location>{
        return this.tryRequest<Location>(async () => {
            const response: superAgent.Response = await this.agent.post(`/locations`)
                .send(model)
            return response;
        });
    }    
    public async GetLocationById( id:string ):Promise<Location>{
        return this.tryRequest<Location>(async () => {
            const response: superAgent.Response = await this.agent.get(`/locations/${id}`)
            return response;
        });
    }    
    public async UpdateLocation( id:string , model:Location ):Promise<Location>{
        return this.tryRequest<Location>(async () => {
            const response: superAgent.Response = await this.agent.put(`/locations/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteLocation( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/locations/${id}`)
            return response;
        });
    }    
    public async GetSheriffs( locationId:string ):Promise<any>{
        const params = { 
            "locationId":locationId 
        };
        return this.tryRequest<any>(async () => {
            const response: superAgent.Response = await this.agent.get(`/sheriffs`)
                .query(params)
            return response;
        });
    }    
    public async CreateSheriff( model:Sheriff ):Promise<Sheriff>{
        return this.tryRequest<Sheriff>(async () => {
            const response: superAgent.Response = await this.agent.post(`/sheriffs`)
                .send(model)
            return response;
        });
    }    
    public async GetSheriffById( id:string ):Promise<Sheriff>{
        return this.tryRequest<Sheriff>(async () => {
            const response: superAgent.Response = await this.agent.get(`/sheriffs/${id}`)
            return response;
        });
    }    
    public async UpdateSheriff( id:string , model:Sheriff ):Promise<Sheriff>{
        return this.tryRequest<Sheriff>(async () => {
            const response: superAgent.Response = await this.agent.put(`/sheriffs/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteSheriff( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/sheriffs/${id}`)
            return response;
        });
    }    
    public async GetCourtrooms( locationId:string ):Promise<Array<Courtroom>>{
        const params = { 
            "locationId":locationId 
        };
        return this.tryRequest<Array<Courtroom>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/courtrooms`)
                .query(params)
            return response;
        });
    }    
    public async CreateCourtroom( model:Courtroom ):Promise<Courtroom>{
        return this.tryRequest<Courtroom>(async () => {
            const response: superAgent.Response = await this.agent.post(`/courtrooms`)
                .send(model)
            return response;
        });
    }    
    public async GetCourtroomById( id:string ):Promise<Courtroom>{
        return this.tryRequest<Courtroom>(async () => {
            const response: superAgent.Response = await this.agent.get(`/courtrooms/${id}`)
            return response;
        });
    }    
    public async UpdateCourtroom( id:string , model:Courtroom ):Promise<Courtroom>{
        return this.tryRequest<Courtroom>(async () => {
            const response: superAgent.Response = await this.agent.put(`/courtrooms/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteCourtroom( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/courtrooms/${id}`)
            return response;
        });
    }    
    public async ExpireCourtroom( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/courtrooms/${id}/expire`)
            return response;
        });
    }    
    public async UnexpireCourtroom( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/courtrooms/${id}/unexpire`)
            return response;
        });
    }    
    public async GetJailRoleCodes( locationId:string ):Promise<Array<JailRoleCode>>{
        const params = { 
            "locationId":locationId 
        };
        return this.tryRequest<Array<JailRoleCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/jailroles`)
                .query(params)
            return response;
        });
    }    
    public async CreateJailRoleCode( model:JailRoleCode ):Promise<JailRoleCode>{
        return this.tryRequest<JailRoleCode>(async () => {
            const response: superAgent.Response = await this.agent.post(`/codes/jailroles`)
                .send(model)
            return response;
        });
    }    
    public async ExpireJailRoleCode( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/codes/jailroles/${id}/expire`)
            return response;
        });
    }    
    public async UnexpireJailRoleCode( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/codes/jailroles/${id}/unexpire`)
            return response;
        });
    }    
    public async UpdateJailRoleCode( id:string , model:JailRoleCode ):Promise<JailRoleCode>{
        return this.tryRequest<JailRoleCode>(async () => {
            const response: superAgent.Response = await this.agent.put(`/codes/jailroles/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteJailRoleCode( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/codes/jailroles/${id}`)
            return response;
        });
    }    
    public async GetOtherAssignCodes( locationId:string ):Promise<Array<OtherAssignCode>>{
        const params = { 
            "locationId":locationId 
        };
        return this.tryRequest<Array<OtherAssignCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/otherassign`)
                .query(params)
            return response;
        });
    }    
    public async CreateOtherAssignCode( model:OtherAssignCode ):Promise<OtherAssignCode>{
        return this.tryRequest<OtherAssignCode>(async () => {
            const response: superAgent.Response = await this.agent.post(`/codes/otherassign`)
                .send(model)
            return response;
        });
    }    
    public async ExpireOtherAssignCode( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/codes/otherassign/${id}/expire`)
            return response;
        });
    }    
    public async UnexpireOtherAssignCode( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/codes/otherassign/${id}/unexpire`)
            return response;
        });
    }    
    public async UpdateOtherAssignCode( id:string , model:OtherAssignCode ):Promise<OtherAssignCode>{
        return this.tryRequest<OtherAssignCode>(async () => {
            const response: superAgent.Response = await this.agent.put(`/codes/otherassign/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteOtherAssignCode( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/codes/otherassign/${id}`)
            return response;
        });
    }    
    public async GetWorkSectionCodes():Promise<Array<WorkSectionCode>>{
        return this.tryRequest<Array<WorkSectionCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/worksection`)
            return response;
        });
    }    
    public async GetSheriffRankCodes():Promise<Array<SheriffRankCode>>{
        return this.tryRequest<Array<SheriffRankCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/sheriffrank`)
            return response;
        });
    }    
    public async GetEscortRuns( locationId:string ):Promise<Array<EscortRun>>{
        const params = { 
            "locationId":locationId 
        };
        return this.tryRequest<Array<EscortRun>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/escort-runs`)
                .query(params)
            return response;
        });
    }    
    public async CreateEscortRun( model:EscortRun ):Promise<EscortRun>{
        return this.tryRequest<EscortRun>(async () => {
            const response: superAgent.Response = await this.agent.post(`/escort-runs`)
                .send(model)
            return response;
        });
    }    
    public async GetEscortRunById( id:string ):Promise<EscortRun>{
        return this.tryRequest<EscortRun>(async () => {
            const response: superAgent.Response = await this.agent.get(`/escort-runs/${id}`)
            return response;
        });
    }    
    public async UpdateEscortRun( id:string , model:EscortRun ):Promise<EscortRun>{
        return this.tryRequest<EscortRun>(async () => {
            const response: superAgent.Response = await this.agent.put(`/escort-runs/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteEscortRun( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/escort-runs/${id}`)
            return response;
        });
    }    
    public async ExpireEscortRun( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/escort-runs/${id}/expire`)
            return response;
        });
    }    
    public async UnexpireEscortRun( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/escort-runs/${id}/unexpire`)
            return response;
        });
    }    
    public async GetShifts( locationId:string ):Promise<Array<Shift>>{
        const params = { 
            "locationId":locationId 
        };
        return this.tryRequest<Array<Shift>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Shifts`)
                .query(params)
            return response;
        });
    }    
    public async CreateShift( model:Shift ):Promise<Shift>{
        return this.tryRequest<Shift>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Shifts`)
                .send(model)
            return response;
        });
    }    
    public async GetShiftById( id:string ):Promise<Shift>{
        return this.tryRequest<Shift>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Shifts/${id}`)
            return response;
        });
    }    
    public async UpdateShift( id:string , model:Shift ):Promise<Shift>{
        return this.tryRequest<Shift>(async () => {
            const response: superAgent.Response = await this.agent.put(`/Shifts/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteShift( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/Shifts/${id}`)
            return response;
        });
    }    
    public async UpdateMultipleShifts( model:MultipleShiftUpdateRequest ):Promise<Array<Shift>>{
        return this.tryRequest<Array<Shift>>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Shifts/multiple`)
                .send(model)
            return response;
        });
    }    
    public async CopyShifts( model:ShiftCopyOptions ):Promise<Array<Shift>>{
        return this.tryRequest<Array<Shift>>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Shifts/copy`)
                .send(model)
            return response;
        });
    }    
    public async GetDutyRecurrences( startDate:string , endDate:string ):Promise<Array<DutyRecurrence>>{
        const params = { 
            "startDate":startDate,
            "endDate":endDate 
        };
        return this.tryRequest<Array<DutyRecurrence>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/DutyRecurrences`)
                .query(params)
            return response;
        });
    }    
    public async CreateDutyRecurrence( model:DutyRecurrence ):Promise<DutyRecurrence>{
        return this.tryRequest<DutyRecurrence>(async () => {
            const response: superAgent.Response = await this.agent.post(`/DutyRecurrences`)
                .send(model)
            return response;
        });
    }    
    public async GetDutyRecurrenceById( id:string ):Promise<DutyRecurrence>{
        return this.tryRequest<DutyRecurrence>(async () => {
            const response: superAgent.Response = await this.agent.get(`/DutyRecurrences/${id}`)
            return response;
        });
    }    
    public async UpdateDutyRecurrence( id:string , model:DutyRecurrence ):Promise<DutyRecurrence>{
        return this.tryRequest<DutyRecurrence>(async () => {
            const response: superAgent.Response = await this.agent.put(`/DutyRecurrences/${id}`)
                .send(model)
            return response;
        });
    }    
    public async ExpireDutyRecurrence( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/DutyRecurrences/${id}`)
            return response;
        });
    }    
    public async DeleteDutyRecurrence( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/DutyRecurrences/${id}`)
            return response;
        });
    }    
    public async GetDuties( locationId:string , startDate:string , endDate:string ):Promise<Array<any>>{
        const params = { 
            "locationId":locationId,
            "startDate":startDate,
            "endDate":endDate 
        };
        return this.tryRequest<Array<any>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Duty`)
                .query(params)
            return response;
        });
    }    
    public async CreateDuty( model:Duty ):Promise<Duty>{
        return this.tryRequest<Duty>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Duty`)
                .send(model)
            return response;
        });
    }    
    public async GetDutyById( id:string ):Promise<Duty>{
        return this.tryRequest<Duty>(async () => {
            const response: superAgent.Response = await this.agent.get(`/Duty/${id}`)
            return response;
        });
    }    
    public async UpdateDuty( id:string , model:Duty ):Promise<Duty>{
        return this.tryRequest<Duty>(async () => {
            const response: superAgent.Response = await this.agent.put(`/Duty/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteDuty( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/Duty/${id}`)
            return response;
        });
    }    
    public async ImportDefaultDuties( body:DutyImportDefaultsRequest ):Promise<Array<Duty>>{
        return this.tryRequest<Array<Duty>>(async () => {
            const response: superAgent.Response = await this.agent.post(`/Duty/import`)
                .send(body)
            return response;
        });
    }    
    public async GetSheriffDuties():Promise<Array<SheriffDuty>>{
        return this.tryRequest<Array<SheriffDuty>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/SheriffDuty`)
            return response;
        });
    }    
    public async CreateSheriffDuty( model:SheriffDuty ):Promise<SheriffDuty>{
        return this.tryRequest<SheriffDuty>(async () => {
            const response: superAgent.Response = await this.agent.post(`/SheriffDuty`)
                .send(model)
            return response;
        });
    }    
    public async GetSheriffDutyById( id:string ):Promise<SheriffDuty>{
        return this.tryRequest<SheriffDuty>(async () => {
            const response: superAgent.Response = await this.agent.get(`/SheriffDuty/${id}`)
            return response;
        });
    }    
    public async UpdateSheriffDuty( id:string , model:SheriffDuty ):Promise<SheriffDuty>{
        return this.tryRequest<SheriffDuty>(async () => {
            const response: superAgent.Response = await this.agent.put(`/SheriffDuty/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteSheriffDuty( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/SheriffDuty/${id}`)
            return response;
        });
    }    
    public async AutoAssignSheriffDuties( model:SheriffDutyAutoAssignRequest ):Promise<Array<SheriffDuty>>{
        return this.tryRequest<Array<SheriffDuty>>(async () => {
            const response: superAgent.Response = await this.agent.post(`/SheriffDuty/auto-assign`)
                .send(model)
            return response;
        });
    }    
    public async GetSheriffLocations( locationId:string ):Promise<Array<SheriffLocation>>{
        const params = { 
            "locationId":locationId 
        };
        return this.tryRequest<Array<SheriffLocation>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/SheriffLocation`)
                .query(params)
            return response;
        });
    }    
    public async CreateSheriffLocation( model:SheriffLocation ):Promise<SheriffLocation>{
        return this.tryRequest<SheriffLocation>(async () => {
            const response: superAgent.Response = await this.agent.post(`/SheriffLocation`)
                .send(model)
            return response;
        });
    }    
    public async GetSheriffLocationById( id:string ):Promise<SheriffLocation>{
        return this.tryRequest<SheriffLocation>(async () => {
            const response: superAgent.Response = await this.agent.get(`/SheriffLocation/${id}`)
            return response;
        });
    }    
    public async UpdateSheriffLocation( id:string , model:SheriffLocation ):Promise<SheriffLocation>{
        return this.tryRequest<SheriffLocation>(async () => {
            const response: superAgent.Response = await this.agent.put(`/SheriffLocation/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteSheriffLocation( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/SheriffLocation/${id}`)
            return response;
        });
    }    
    public async GetLeaves():Promise<Array<Leave>>{
        return this.tryRequest<Array<Leave>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/leaves`)
            return response;
        });
    }    
    public async CreateLeave( model:Leave ):Promise<Leave>{
        return this.tryRequest<Leave>(async () => {
            const response: superAgent.Response = await this.agent.post(`/leaves`)
                .send(model)
            return response;
        });
    }    
    public async GetLeaveById( id:string ):Promise<Leave>{
        return this.tryRequest<Leave>(async () => {
            const response: superAgent.Response = await this.agent.get(`/leaves/${id}`)
            return response;
        });
    }    
    public async UpdateLeave( id:string , model:Leave ):Promise<Leave>{
        return this.tryRequest<Leave>(async () => {
            const response: superAgent.Response = await this.agent.put(`/leaves/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteLeave( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/leaves/${id}`)
            return response;
        });
    }    
    public async GetLeaveCancelReasonCodes():Promise<Array<LeaveCancelReasonCode>>{
        return this.tryRequest<Array<LeaveCancelReasonCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/leave-cancel`)
            return response;
        });
    }    
    public async GetLeaveTypes():Promise<Array<LeaveCode>>{
        return this.tryRequest<Array<LeaveCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/leave-type`)
            return response;
        });
    }    
    public async GetLeaveSubCodes( startDate:string , endDate:string ):Promise<Array<LeaveSubCode>>{
        const params = { 
            "startDate":startDate,
            "endDate":endDate 
        };
        return this.tryRequest<Array<LeaveSubCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/leave-sub-type`)
                .query(params)
            return response;
        });
    }    
    public async CreateLeaveSubCode( model:LeaveSubCode ):Promise<LeaveSubCode>{
        return this.tryRequest<LeaveSubCode>(async () => {
            const response: superAgent.Response = await this.agent.post(`/codes/leave-sub-type`)
                .send(model)
            return response;
        });
    }    
    public async GetLeaveSubCodeById( id:string ):Promise<LeaveSubCode>{
        return this.tryRequest<LeaveSubCode>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/leave-sub-type/${id}`)
            return response;
        });
    }    
    public async UpdateLeaveSubCode( id:string , model:LeaveSubCode ):Promise<LeaveSubCode>{
        return this.tryRequest<LeaveSubCode>(async () => {
            const response: superAgent.Response = await this.agent.put(`/codes/leave-sub-type/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteLeaveSubCode( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/codes/leave-sub-type/${id}`)
            return response;
        });
    }    
    public async ExpireLeaveSubCode( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/codes/leave-sub-type/${id}/expire`)
            return response;
        });
    }    
    public async UnexpireLeaveSubCode( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/codes/leave-sub-type/${id}/unexpire`)
            return response;
        });
    }    
    public async GetCourtRoleCodes( locationId:string ):Promise<Array<CourtRoleCode>>{
        const params = { 
            "locationId":locationId 
        };
        return this.tryRequest<Array<CourtRoleCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/courtroles`)
                .query(params)
            return response;
        });
    }    
    public async CreateCourtRoleCode( model:CourtRoleCode ):Promise<CourtRoleCode>{
        return this.tryRequest<CourtRoleCode>(async () => {
            const response: superAgent.Response = await this.agent.post(`/codes/courtroles`)
                .send(model)
            return response;
        });
    }    
    public async ExpireCourtRoleCode( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/codes/courtroles/${id}/expire`)
            return response;
        });
    }    
    public async UnexpireCourtRoleCode( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.post(`/codes/courtroles/${id}/unexpire`)
            return response;
        });
    }    
    public async UpdateCourtRoleCode( id:string , model:CourtRoleCode ):Promise<CourtRoleCode>{
        return this.tryRequest<CourtRoleCode>(async () => {
            const response: superAgent.Response = await this.agent.put(`/codes/courtroles/${id}`)
                .send(model)
            return response;
        });
    }    
    public async DeleteCourtRoleCode( id:string ):Promise<void>{
        return this.tryRequest<void>(async () => {
            const response: superAgent.Response = await this.agent.delete(`/codes/courtroles/${id}`)
            return response;
        });
    }    
    public async GetGenderCodes():Promise<Array<GenderCode>>{
        return this.tryRequest<Array<GenderCode>>(async () => {
            const response: superAgent.Response = await this.agent.get(`/codes/gender`)
            return response;
        });
    }    
}