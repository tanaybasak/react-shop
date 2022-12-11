import { ApolloProvider } from '@apollo/client';
import React from 'react';
import Routing from './Routes/Routes';
import client from './common/apollo-client';

function App() {
	return (
			<ApolloProvider client={client}>
				<Routing />
			</ApolloProvider>
	);
}

export default App;
