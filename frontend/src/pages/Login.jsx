import {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import {AuthContext} from '../context/AuthContext.jsx'
import HashLoader from 'react-spinners/BeatLoader';


const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '' ,
  });

  // loading State
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

        //========================
       // Form submission handler
       const submitHandler = async event => {
        event.preventDefault();  // Prevent default form submission
    
        try {
          //must need backend API to fetch
          // Send registration request to backend
          const res = await fetch(`${BASE_URL}/login`,{
            method:'post',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)  // Send form data as JSON
          })
          //======================================================
    
          //=========== LOGICS ===================================
          const result = await res.json()  // Extract message from response

          console.log(result)
    
          // Handle unsuccessful registration
          if(!res.ok){
            throw new Error(result.message);
          }

          //After succesfull login
          dispatch({
            type:'LOGIN_SUCCESS',
            payload:{
              user:result.data.name,
              token:result.token,
              role:result.data.role,
            },
          });

          console.log(result, 'login data');
    
          // Handle successful registration
          setLoading(false)
          toast.success(result.message)  // Show success message
          navigate('/home')      // Redirect to login page
        
        } catch (err) {
          // Handle registration errors
          toast.error(err.message)  // Show error message
          setLoading(false)         // Stop loading state
        }
      };

  return (
    <section className='px-5 lg:px-0'>
      <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
        <h3 className='text-headingColor text-center text-[22px] leading-9 font-bold mb-10'>
          Hello!  <span className='text-primaryColor'>Welcome</span>  Back 🎉
        </h3>

        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          {/* ===== EMAIL ===== */}
          <div className='mb-5'>
            <input
              type="email"
              placeholder='Enter Your Email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
            focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
            placeholder:text-textColor
            rounded-md cursor-pointer'
              required />
          </div>
            {/* === PASSWORD ===== */}
          <div className='mb-5'>
            <input
              type="password"
              placeholder='Password'
              name='password' value={formData.password}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
            focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
            placeholder:text-textColor
            rounded-md cursor-pointer'
              required />
          </div>

          <div className='mt-7 flex justify-center'>
            <button type='submit' className='w-64 bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
              {loading ? <HashLoader size={25} color='#fff'/> : 'Login'}
            </button>
          </div>

          <p className='mt-5 text-textColor text-center'>
            Don&apos;t have an account?
            <Link to='/register' className='text-primaryColor font-medium mt-1'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;