import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@testing-library/react';
import React from 'react';
import Routing from '../Routes/Routes';

it('should render the routing', async () => {
	// client has the exact same configuration as our root app client
	const client = new ApolloClient({
		cache: new InMemoryCache(),
	});

	render(
		<ApolloProvider client={client}>
			<Routing />
		</ApolloProvider>,
	);
});
