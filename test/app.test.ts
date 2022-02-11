import { Request, Response, NextFunction } from 'express';
import { getEntities, getEntity, postGetFilters, postObjects, postEntity } from '../src/controllers/Entity';
import Entity from '../src/models/Entity';
import User from '../src/models/User';
import * as nats from '../src/utils/nats';

describe('Entity', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject: any;

    beforeEach(() => {
        jest.spyOn(User, "findById")
            .mockImplementationOnce(() => ({ user: 1 } as any))
            .mockImplementationOnce(() => null as any)
            .mockImplementationOnce(() => ({ user: 1 } as any))
            .mockImplementationOnce(() => null as any)
            .mockImplementationOnce(() => ({ user: 1 } as any))
            .mockImplementationOnce(() => ({ user: 1 } as any));
        jest.spyOn(Entity, "find")
            .mockImplementation(() => ([{ entities: [1, 2, 3] }] as any));
        jest.spyOn(Entity, "findById")
            .mockImplementationOnce(() => ({ entity: "entity object" } as any))
            .mockImplementationOnce(() => ({ methods: [{ type: 1 }] } as any))
            .mockImplementationOnce(() => (null as any))
            .mockImplementationOnce(() => ({ methods: [{ type: 2 }] } as any))
            .mockImplementationOnce(() => (null as any))
            .mockImplementationOnce(() => ({ methods: [{ type: 2 }], save: () => ({ save: 'entity test' }) } as any));
        jest.spyOn(nats, "getNatsData")
            .mockImplementationOnce(() => ({ nats: "data" } as any))
            .mockImplementationOnce(() => ([{ nats: "data" }, { nats: "data2" }] as any))
            .mockImplementationOnce(() => ({ nats: "post response" } as any));

        mockRequest = { params: { id: "1" }, body: { id: "1" }, session: { userId: "1" } as any };
        mockResponse = {
            statusCode: 0,
            json: jest.fn().mockImplementation(result => {
                responseObject = result;
            }),
        }
    });

    test("getEntities test", async () => {
        await getEntities(mockRequest as Request, mockResponse as Response);
        expect(responseObject).toEqual({ "data": [{ entities: [1, 2, 3] }], "success": "OK" });
    });

    test("getEntities test no user", async () => {
        await getEntities(mockRequest as Request, mockResponse as Response);
        expect(responseObject).toEqual({ success: 'Error', message: 'No user' });
    });

    test("getEntity test", async () => {
        await getEntity(mockRequest as Request, mockResponse as Response);
        expect(responseObject).toEqual({ success: 'OK', data: { entity: "entity object" } });
    });

    test("postGetFilters test", async () => {
        await postGetFilters(mockRequest as Request, mockResponse as Response);
        expect(responseObject).toEqual({ success: 'OK', data: [{ nats: "data" }] });
    });

    test("postGetFilters test with array", async () => {
        await postGetFilters(mockRequest as Request, mockResponse as Response);
        expect(responseObject).toEqual({ success: 'OK', data: [{ nats: "data" }, { nats: "data2" }] });
    });

    test("postObjects test", async () => {
        await postObjects(mockRequest as Request, mockResponse as Response);
        expect(responseObject).toEqual({ success: 'OK', data: { nats: "post response" } });
    });

    test("postObjects test no user", async () => {
        await postObjects(mockRequest as Request, mockResponse as Response);
        expect(responseObject).toEqual({ success: 'Error', message: 'No user' });
    });

    test("postObjects test no entity", async () => {
        await postObjects(mockRequest as Request, mockResponse as Response);
        expect(responseObject).toEqual({ success: 'Error', message: 'No entity' });
    });

    test("postObjects test no post method", async () => {
        await postObjects(mockRequest as Request, mockResponse as Response);
        expect(responseObject).toEqual({ success: 'Error', message: 'No post method' });
    });

    test("postEntity test no entity", async () => {
        await postEntity(mockRequest as Request, mockResponse as Response);
        expect(responseObject).toEqual({ success: 'Error' });
    });

    test("postEntity test", async () => {
        await postEntity(mockRequest as Request, mockResponse as Response);
        expect(responseObject.success).toEqual('OK');
    });
})