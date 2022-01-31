export interface IMethod {
    id: string;
    active: boolean;
    subscriptionName: string;
    filterSchema: { [key: string]: string };
    subscriptionBody: { [key: string]: string };
    responseSchema: { [key: string]: string };
}

export interface IEntity {
    id: string;
    name: string;
    description?: string;
    methods?: IMethod[];
}

export interface IUser {
    id: string;
    email: string;
    password: string;
    entities: IEntity[];

}