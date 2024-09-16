// Importing necessary libraries and components
import React from 'react'

import Header from '../components/header/Header';  // Importing the Header component
import Footer from '../components/footer/Footer';  // Importing the Footer component
import Routers from '../routes/Routers';           // Importing the Routers component to handle page routing

// Layout component
const Layout = () => {
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
