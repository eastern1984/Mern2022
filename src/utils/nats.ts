import { Client, connect } from 'ts-nats';

let nc: Client;

export const getNatsData = async (subscriptionName: string, data: any) => {
    try {
        const timeout = parseInt(process.env.NATS_TIMEOUT || '0');
        const result = await nc.request(subscriptionName, timeout, data);
        return result;
    } catch (ex) {
        console.log("NATS connect error");
    }
    return { test: 'data' };
}

export const natsConnect = async () => {
    try {
        let nc = await connect({ servers: [process.env.NATS_CONNECTION || ""] });
        console.log("NATS connected", nc);
    } catch (ex) {
        console.log("NATS init connect error");
    }
}
