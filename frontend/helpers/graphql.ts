import { SubscriptionClient } from "subscriptions-transport-ws";
import { Client, defaultExchanges, subscriptionExchange } from "urql";

const WS_URL = "wss://beats.patrick.wtf/graphql";
const API_URL = "https://beats.patrick.wtf/graphql";

// const WS_URL = "ws://localhost:5000/graphql";
// const API_URL = "http://localhost:5000/graphql";

const subscriptionClient = process.browser
  ? new SubscriptionClient(WS_URL, {
      reconnect: true,
    })
  : null;

export const client = new Client({
  url: API_URL,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        if (!subscriptionClient) {
          return;
        }

        return subscriptionClient.request(operation);
      },
    }),
  ],
});
