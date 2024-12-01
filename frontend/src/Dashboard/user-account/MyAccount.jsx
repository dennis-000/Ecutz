import userImg from '../../assets/images/user-img1.jpg';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const MyAccount = () => {

  const {dispatch} = useContext (AuthContext)

  const handleLogout = ()=>{
    dispatch({type:'LOGOUT'})
  }


  return (
    <div className="max w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-10">

        <div className="pb-[50] px-[30] rounded-md">
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
            <p className='text-textColor bg-headingColor text-[15px]'>
              kofi@gmail.com
              </p>
            <p className='text-textColor bg-headingColor text-[15px]'>
              +233 123-234-3456
              </p>
          </div>

          <div className='mt-[50px] md:mt-[100px]'>
            <button 
            onClick={handleLogout} 
            className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'>
              Logout
              </button>
            <button className='w-full bg-red-700 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
              Delete Account
              </button>

          </div>

        </div>
      </div>
    </div>
  )
}

export default MyAccount