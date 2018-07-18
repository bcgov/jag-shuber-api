import ApiClient from '../ExtendedClient';
import {auth} from '../index';
import { 
    LeaveSubCode
} from '../models';
import TestUtils from './TestUtils';

const SubCodeShape: LeaveSubCode = {
    code: 'some string',
    subCode: 'some string',
    description: 'some string'
}

describe('Token API', () => {
    let api: ApiClient;

    beforeAll(async (done) => {
        api = TestUtils.getClient();              
        done();
    });

    it('get token should with no siteminder headers should return not authorized', async () => {
        api = TestUtils.getClient();
        await expect(api.GetToken()).rejects.toEqual(new Error("Couldn't authenticate request."));          
    });

    it('get token should with no siteminder headers should return not authorized', async () => {
        api = TestUtils.getClient();
        api.requestInterceptor = (req)=>{
            req.set(auth.SITEMINDER_HEADER_USERGUID,'bnye');
            return req;
        }
        await expect(api.GetToken()).resolves.toBeDefined();          
    });

}) 