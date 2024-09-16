// Importing the app's main CSS file for global styles
import './app.css'; 

// Importing the Layout component, which includes the Header, Footer, and the main content (Routers)
import Layout from './layout/Layout';

// App component definition
function App() {
  // Rendering the Layout component
  return <Layout />;
}

// Exporting the App component as the default export, so it can be imported elsewhere (like in index.js)
export default App;
