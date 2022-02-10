/*import Tasu from 'tasu';
export const tasu = new Tasu({ group: 'some-service' });*/

export const getNatsData = async (subscriptionName: string, data: any) => {
    const result = { qq: 1 };//await tasu.request(subscriptionName, data);

    return result;
}

export const natsConnect = () => {
    /*tasu.on('connect', () => {
        console.log('nats connected');
    });
    tasu.on('error', (e: Error) => {
        throw e;
    });*/
}
