export const getNatsData = async (subscriptionName: string, data: any) => {
    return { success: 'OK', data: { ...data, natsSubscription: subscriptionName } };
}
