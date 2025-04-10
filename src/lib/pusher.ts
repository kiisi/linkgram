import Pusher from "pusher-js";

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
    forceTLS: true,
    enabledTransports: ['ws', 'wss'],
});
