import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
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
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <StoreProvider>
        <Container fluid className="px-0">
          <NavBar />
          <Container fluid="lg" className="my-3">
              {/* This container holds the main content, adjusting margins as needed */}
            <Outlet />
            </Container>
            <Footer />
          </Container>
        </StoreProvider>
      </UserProvider>
      
    </ApolloProvider>
  );
}

export default App;
