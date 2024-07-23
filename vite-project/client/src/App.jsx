import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  createUploadLink
} from '@apollo/client';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import NavBar from './components/Nav';
import Footer from './components/Footer';
import { UserProvider } from './utils/User/UserState';
import { StoreProvider } from './utils/Store/GlobalState';
import './App.css';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const httpLink = createHttpLink({
  uri: '/graphql',
});


const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: createUploadLink({
    uri: '/graphql',
  }),
  cache: new InMemoryCache(),
});

const stripePromise = loadStripe('pk_test_51PLfQzHtSDzrFduejKinc8pJJwIcbhF1P5a8aEy1iteLrh1vTfIcZjnLqmEE23zpGuYZNKtGYzrrz83Neajbs3YN00bGxbkNmK');


function App() {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <StoreProvider>
          <Elements stripe={stripePromise}>
          <Container fluid className="px-0">
            <NavBar />
            <Container fluid="lg" className="my-3">
                {/* This container holds the main content, adjusting margins as needed */}
              <Outlet />
              </Container>
              <Footer />
            </Container>
          </Elements>
        </StoreProvider>
      </UserProvider>
      
    </ApolloProvider>
  );
}

export default App;
