import moment from 'moment';
import ApiClient from '../ExtendedClient';
import { Assignment, Courthouse, Region } from '../models';
import TestData from './TestData';

const testData = new TestData();

describe('Assignment API', () => {
    let api: ApiClient;

    let testRegion: Region = {
        name: "Assignment Testing Region",
        code: TestData.randomString(5)
    }
    let testCourthouse: Courthouse = {
        name: "Assignment Testing Courthouse",
        code: TestData.randomString(5)
    }

    const entityToCreate: Assignment = {
        title: "Test Assignment",
        workSectionCode:"JAIL",        
        courthouseId: "ToReplace"
    };

    let createdEntity: Assignment;

    beforeAll(async (done) => {
        api = new ApiClient('http://localhost:3000/v1');
        await testData.clearDatabase();
        testRegion = await api.CreateRegion(testRegion);
        testCourthouse = await api.CreateCourthouse({ ...testCourthouse, regionId: testRegion.id });
        done();
    });

    it('create should return new Assignment', async () => {
        createdEntity = await api.CreateAssignment({
            ...entityToCreate,
            courthouseId: testCourthouse.id
        });
        expect(createdEntity).toBeDefined();
        expect(createdEntity.id).toBeDefined();
        expect(createdEntity.courthouseId).toEqual(testCourthouse.id);
        expect(createdEntity).toEqual({
            ...createdEntity,
            ...entityToCreate,
            courthouseId: testCourthouse.id
        });
    });

    it('get by id should return Assignment', async () => {
        const retrieved = await api.GetAssignmentById(createdEntity.id);
        expect(retrieved).toMatchObject(createdEntity);
    });

    it('get List should return list of Assignments', async () => {
        const list = await api.GetAssignments();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(1);
    });

    it('get list should return only those Assignments in courthouse if specified', async () => {
        const secondTestCourthouse = { ...testCourthouse }
        delete secondTestCourthouse['id'];
        secondTestCourthouse.name = "Test Courthouse 2";
        secondTestCourthouse.code= TestData.randomString(5);
        const secondCourthouse = await api.CreateCourthouse(secondTestCourthouse);
        const secondEntity = await api.CreateAssignment({
            ...entityToCreate,
            name: "second Assignment",
            courthouseId: secondCourthouse.id
        } as Assignment);

        let list = await api.GetAssignments();
        expect(list.length).toEqual(2);

        list = await api.GetAssignments(secondCourthouse.id);
        expect(list.length).toEqual(1);
        expect(list[0]).toEqual(secondEntity);
    });

    it('get list should respect effective dates',async ()=>{
        const list = await api.GetAssignments(undefined,moment().subtract(1,'weeks'));
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(0);
    });

    it('expire should set expiry date for assignment and hide from get operation',async ()=>{
        await api.ExpireAssignment(createdEntity.id);
        const list = await api.GetAssignments();
        expect(list.some(a=>a.id===createdEntity.id)).toBeFalsy();
    })


    it('update Assignment should return updated Assignment', async () => {
        const newTitle = "New Assignment Name";
        const updatedEntity = await api.UpdateAssignment(createdEntity.id, {
            ...createdEntity,
            title: newTitle
        } as Assignment);
        expect(updatedEntity).toMatchObject({
            ...createdEntity,
            title: newTitle,
        });
    });

    it('delete should delete Assignment', async () => {
        await api.DeleteAssignment(createdEntity.id);
        const retreived = await api.GetAssignmentById(createdEntity.id);
        expect(retreived).not.toBeDefined();
    });
}) 