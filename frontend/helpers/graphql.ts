import { SubscriptionClient } from "subscriptions-transport-ws";
import { Client, defaultExchanges, subscriptionExchange } from "urql";

const subscriptionClient = process.browser
  ? new SubscriptionClient("wss://strawberry-beats.onrender.com/graphql", {
      reconnect: true,
    })
  : null;

export const client = new Client({
  url: "https://strawberry-beats.onrender.com/graphql",
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
