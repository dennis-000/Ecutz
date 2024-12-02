import userImg from '../../assets/images/barber-img01.jpg';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';


const MyAccount = () => {

  const {dispatch} = useContext (AuthContext)
  const [tab,setTab] = useState ('bookings')

  const handleLogout = ()=>{
    dispatch({type:'LOGOUT'})
  }


  return (
    <div className="max-w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-10">

        <div className="pb-[50px] px-[30px] rounded-md">
          <div className="flex items-center justify-center">
            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
              <img 
              src={userImg} 
              alt="The user's image" 
              className='w-full h-full rounded-full' />
            </figure>
          </div>


          <div className='text-center mt-4'>
            <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>Kofi</h3>
            <p className='text-textColor text-[15px] leading-6 font-medium'>
              kofi@gmail.com
              </p>
            <p className='text-textColor text-[15px] leading-6 font-medium'>
              +233 123-234-3456
              </p>
          </div>

          <div className='mt-[50px] md:mt-[100px]'>
            <button 
            onClick={handleLogout} 
            className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white font-bold'>
              Logout
              </button>
            <button className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white font-bold'>
              Delete Account
              </button>

          </div>

        </div>

        <div className='md:col-span-2 md:px-[30px]'>
          <div>
          <button 
              onClick={() => setTab('appointments')} 
              className={`p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] 
              leading-7 border border-solid border-primaryColor ${
                tab === 'appointments' ? 'bg-primaryColor text-white font-normal' : ''
              }`}>
              My Bookings
            </button>
            
            <button 
              onClick={() => setTab('settings')} 
              className={`py-2 px-5 rounded-md text-headingColor font-semibold text-[16px]
              leading-7 border border-solid border-primaryColor ${
                tab === 'settings' ? 'bg-primaryColor text-white font-normal' : ''
              }`}>
              Profile Settings
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MyAccount