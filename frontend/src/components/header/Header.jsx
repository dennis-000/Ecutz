import { useEffect, useRef } from 'react'
// ============= Logo importation
import logo from "../../assets/images/ecutz.png";
// ===============Image importation --- Profile
import userImg from '../../assets/images/avatar-icon.png';

import { NavLink, Link } from "react-router-dom";
import { BiMenu } from 'react-icons/bi';


// ========== CODDED ========
// Nav Path Links
const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/barbers',
    display: 'Find a Barber'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
  
]


const Header = () => {
  const headerRef = useRef(null)
  const menuRef = useRef(null)



  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }
  
  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener('scroll', handleStickyHeader)
  });

  const toggleMenu = ()=> menuRef.current.classList.toggle('show__menu')

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify justify-between">
      {/* ========= logo =========== */}
          <div>
            <img src={logo} alt="Ecutz Logo" style={{ width: '70px', height: '70px' }} />
          </div>


          {/* ========= MENU  ========= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {/* Addin all the necessary attributes here to modify the  the nav bar */}
              {
                navLinks.map((link, index) =><li key={index}>
                  <NavLink to={link.path} className={navClass => navClass.isActive
                    ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                    : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'
                  }
                  >
                    {link.display}
                  </NavLink>
                </li>
                )}
            </ul>
          </div>
         
          {/* =========== nav right ============ */}
          <div className='flex items-center gap-4'>
            <div className='hidden'>
              <Link to='/'>
                {/* User Profile Picture --- with it's styling */}
                <figure className='w-[35px] rounded-full cursor-pointer'>
                  <img src={userImg} className="w-full rounded-full" alt="The User Image" />
                </figure>
              </Link>
            </div>

            
{/* =============== Login Button ================ */}
            <Link to='/login'>
              <button className='bg-primaryColor py-6 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                Login
              </button>
            </Link>
        {/* ========== Nav Image =======  */}
            <span className='md:hidden' onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer'/>
            </span>


          </div>

        </div>
      </div>
  </header>
  );
};

export default Header;