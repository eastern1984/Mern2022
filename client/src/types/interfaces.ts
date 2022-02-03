export enum METHOD_TYPES { GET, POST }

export interface IMethod {
    type: number;
    active: boolean;
    subscriptionName: string;
    filterSchema: { [key: string]: string };
    subscriptionBody: { [key: string]: string };
    responseSchema: { [key: string]: string };
}

export interface IEntity {
    _id: string;
    name: string;
    description: string;
    methods: IMethod[]
}

export interface IUser {
    id: string;
    email: string;
    password: string;
    entities: IEntity[];

}