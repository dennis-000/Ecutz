// Importing necessary libraries and components

import Header from '../components/header/Header';  // Importing the Header component
import Footer from '../components/footer/Footer';  // Importing the Footer component
import Routers from '../routes/Routers';           // Importing the Routers component to handle page routing
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


// Layout component
const Layout = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { exp } = jwtDecode(token); // Decode the token
          if (Date.now() >= exp * 1000) {
            localStorage.removeItem('token'); // Clear expired token
            navigate('/login'); // Redirect to login
          }
        } catch (error) {
          console.error("Error decoding token", error);
          localStorage.removeItem('token'); // Clear invalid token
          navigate('/login');
        }
      }
    };

    checkTokenExpiry();
  }, [navigate]);


  return (
    <>
      {/* Rendering the Header component */}
      <Header />

      {/* Main content area where the current route's page will be displayed */}
      <main>
        <Routers />   {/* The Routers component handles switching between different routes (pages) */}
      </main>

      {/* Rendering the Footer component */}
      <Footer />
    </>
  );
};

export default Layout;  // Exporting the Layout component so it can be used in other parts of the app
