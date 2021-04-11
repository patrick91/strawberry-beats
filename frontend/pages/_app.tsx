import { Provider } from "urql";

import { client } from "~/helpers/graphql";

import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
