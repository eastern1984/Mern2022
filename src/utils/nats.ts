import { connect, NatsConnection } from 'nats';

let nc: NatsConnection;

export const getNatsData = async (subscriptionName: string, data: any) => {
    try {
        const response = await nc.request(subscriptionName, new Uint8Array(data));
        const resultData = new TextDecoder().decode(response.data);
        return JSON.parse(resultData || '{ "data": "no data in response" }')
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
