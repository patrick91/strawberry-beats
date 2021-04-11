import { SubscriptionClient } from "subscriptions-transport-ws";
import { Client, defaultExchanges, subscriptionExchange } from "urql";

const subscriptionClient = process.browser
  ? new SubscriptionClient("ws://localhost:5000/graphql", { reconnect: true })
  : null;

export const client = new Client({
  url: "/graphql",
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
