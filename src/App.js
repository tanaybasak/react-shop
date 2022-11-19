import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Provider } from "react-redux";
import Routing from "./Routes/Routes";
import store from "./store";
import client from "./common/apollo-client";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Routing />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
