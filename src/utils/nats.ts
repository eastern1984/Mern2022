import { Client, connect } from 'ts-nats';

let nc: Client;

export const getNatsData = async (subscriptionName: string, data: any) => {
    try {
        const timeout = parseInt(process.env.NATS_TIMEOUT || '10000');
        const response = await nc.request(subscriptionName, timeout, JSON.stringify(data));
        return JSON.parse(response.data || '{ "data": "no data in response" }')
    } catch (ex) {
        console.log("NATS request error - ", ex);
    }
    return { test: 'data' };
}

export const natsConnect = async () => {
    try {
        nc = await connect({ servers: [process.env.NATS_CONNECTION || ""] });
        console.log("NATS connected", nc);
    } catch (ex) {
        console.log("NATS init connect error");
    }
}
