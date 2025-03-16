import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home/index.jsx';
import Signup from './pages/signup/index.jsx';
import Login from './pages/login/index.jsx';
import Landing from './uncompletedPages/landing/index.jsx';
import Checkout from './pages/checkout/index.jsx';
import CartPage from './pages/cart/index.jsx';
import Categories from './uncompletedPages/categories/index.jsx';
import Products from './pages/products/index.jsx';
import Shipping from './uncompletedPages/shipping/index.jsx';
import ItemDetail from './pages/itemDetail/index.jsx';
import Reviews from './uncompletedPages/Reviews/index.jsx';
import OrderHistory from './uncompletedPages/OrderHistory/index.jsx';
import About  from './uncompletedPages/About/index.jsx';
import Contact from './pages/Contact/index.jsx';
import AdminDash from './pages/Admin/Dashboard/index.jsx';
import ProductForm from './pages/Admin/Products/index.jsx';
import AdminProductDetails from './pages/Admin/productDetails/index.jsx';
import AdminUsers from './pages/Admin/Users/index.jsx';
// import AdminReviews from './pages/Admin/Reviews.jsx';
import AdminAlertsNotifications from './pages/Admin/alertsNotifications/index.jsx';
import NoMatch from './uncompletedPages/NoMatch/index.jsx';

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
        element: <ProductForm />
      // }, {
      //   path: '/Admin/Orders',
      //   element: <AdminOrders />
      }, {
        path: '/Admin/Users',
        element: <AdminUsers />
      // }, {
      //   path: '/Admin/Reviews',
      //   element: <AdminReviews />
      }, {
        path: '/Admin/Alerts+Notifications',
        element: <AdminAlertsNotifications />
      }, {
        path: '/Admin/ProductDetails',
        element: <AdminProductDetails />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
