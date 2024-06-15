import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/signup';
import Login from './pages/login';
import Landing from './pages/landing';
import Checkout from './pages/checkout';
import CartPage from './pages/cart/index.jsx';
import Categories from './pages/categories';
import Products from './pages/products';
import Shipping from './pages/shipping';
import ItemDetail from './pages/itemDetail';
import Reviews from './pages/Reviews';
import OrderHistory from './pages/OrderHistory';
import About  from './pages/About';
import Contact from './pages/Contact';
import AdminDash from './pages/Admin/Dashboard';
import AdminProducts from './pages/Admin/Products';
import AdminOrders from './pages/Admin/Orders';
import AdminUsers from './pages/Admin/Users';
import AdminReviews from './pages/Admin/Reviews';
import AdminCategories from './pages/Admin/Categories';
import NoMatch from './pages/NoMatch';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/landing',
        element: <Landing />
      },{
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/cart',
        element: <CartPage />
      }, {
        path: '/orderHistory',
        element: <OrderHistory />
      }, {
        path: '/itemDetail/:id',
        element: <ItemDetail />
      }, {
        path: '/reviews',
        element: <Reviews />
      }, {
        path: '/checkout',
        element: <Checkout />
      }, {
        path: '/categories',
        element: <Categories />
      }, {
        path: '/products',
        element: <Products />
      }, {
        path: '/shipping',
        element: <Shipping />
      }, {
        path: '/about',
        element: <About />
      }, {
        path: '/contact',
        element: <Contact />
      }, {
        path: '/Admin/',
        element: <AdminDash />
      }, {
        path: '/Admin/Products',
        element: <AdminProducts />
      }, {
        path: '/Admin/Orders',
        element: <AdminOrders />
      }, {
        path: '/Admin/Users',
        element: <AdminUsers />
      }, {
        path: '/Admin/Reviews',
        element: <AdminReviews />
      }, {
        path: '/Admin/Categories',
        element: <AdminCategories />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
