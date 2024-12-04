import userImg from '../../assets/images/barber-img01.jpg';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

import MyAppoinments from './MyAppoinments';
import Profile from './Profile';

import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';

import Loading from '../../components/Loading/Loading';


const MyAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [tab, setTab] = useState('bookings'); // Default active tab
  const {user, role, token} = useContext(AuthContext)




  // eslint-disable-next-line no-unused-vars
  const { data: userData, loading, error } = useGetProfile(`${BASE_URL}users/${user._id}`);
  

  console.log(userData, 'userData');

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
   <section>
     <div className="max-w-[1170px] px-5 mx-auto">

    {loading && <Loading/>}

     {!loading && !error && (
        <div className="grid md:grid-cols-3 gap-10">
        {/* Sidebar */}
        <div className="pb-[50px] px-[30px] rounded-md">
          <div className="flex items-center justify-center">
            <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
              <img
                src={userImg}
                alt="The user's image"
                className="w-full h-full rounded-full"
              />
            </figure>
          </div>

          <div className="text-center mt-4">
            <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">Kofi</h3>
            <p className="text-textColor text-[15px] leading-6 font-medium">kofi@gmail.com</p>
            <p className="text-textColor text-[15px] leading-6 font-medium">+233 123-234-3456</p>
          </div>

          <div className="mt-[50px] md:mt-[100px]">
            <button
              onClick={handleLogout}
              className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white font-bold"
            >
              Logout
            </button>
            <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white font-bold">
              Delete Account
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 md:px-[30px]">
          {/* Tab Buttons */}
          <div style={{ position: 'relative', zIndex: 10 }}>
          <button
              onClick={() =>{ console.log('My Bookings button clicked');
                setTab('bookings')}}
              className={`p-2 mr-5 px-5 rounded-md font-semibold text-[16px] leading-7 border border-solid ${
                tab === 'bookings'
                  ? 'bg-primaryColor text-white border-primaryColor'
                  : 'text-headingColor border-gray-300'
              }`}
            >
              My Appointments
            </button>

            <button
              onClick={() => setTab('settings')}
              className={`py-2 px-5 rounded-md font-semibold text-[16px] leading-7 border border-solid ${
                tab === 'settings'
                  ? 'bg-primaryColor text-white border-primaryColor'
                  : 'text-headingColor border-gray-300'
              }`}
            >
              Profile Settings
            </button>
          </div>

          {
          tab ==='bookings' && <MyAppoinments  />
          }
          {
            tab==='settings' && <Profile/>
          }
        </div>
      </div>
      )
      }
    </div>
   </section>
  );
};

export default MyAccount;
