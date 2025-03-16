import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import NavBar from './components/Nav/index.jsx';
import Footer from './components/Footer/index.jsx';
import AnalyticsProvider from './utils/Analytics/Analytics.State.jsx';
import {UserProvider} from './utils/User/UserState.jsx';
import StoreProvider from './utils/Store/GlobalState.jsx';
import useSessionDuration from './utils/Analytics/analytics.utils.js/sessionDuration.jsx';
import useEnterExit from './utils/Analytics/analytics.utils.js/KumNGo.jsx';
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
  // useSessionDuration();
  // useEnterExit();

  return (
    <ApolloProvider client={client}>
      <AnalyticsProvider>
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
      </AnalyticsProvider>
    </ApolloProvider>
  );
}

export default App;
