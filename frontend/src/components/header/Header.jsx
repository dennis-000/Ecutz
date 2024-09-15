import {useEffect, useRef} from 'react'
import logo from "../../assets/images/ecutz.png";

import { NavLink, Link } from "react-router-dom";

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
  return (
    <header className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify justify-between">
      {/* ========= logo =========== */}
          <div>
            <img src={logo} alt="Ecutz Logo" style={{ width: '80px', height: '80px' }} />
          </div>


          {/* ========= MENU  ========= */}
          <div className="navigation">
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
          <div>
            
          </div>

        </div>
      </div>
  </header>
  );
};

export default Header;