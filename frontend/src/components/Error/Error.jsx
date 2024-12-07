/* eslint-disable react/prop-types */
const Error = ({ errMessage }) => {
    // Check if errMessage is an object or a string and handle accordingly
    const message = typeof errMessage === "string" 
      ? errMessage 
      : JSON.stringify(errMessage);
  
    return (
      <div className="error">
        <h3>Error:</h3>
        <p>{message}</p>
      </div>
    );
  };
  
  export default Error;
  