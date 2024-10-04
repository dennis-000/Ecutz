// Importing necessary React hooks and libraries
import { useEffect, useRef } from 'react'
// Importing the logo image
import logo from "../../assets/images/ecutz.png";
// Importing the user profile image
import userImg from '../../assets/images/avatar-icon.png';

// Importing React Router components for navigation
import { NavLink, Link } from "react-router-dom";
// Importing an icon (menu icon for mobile view)
import { BiMenu } from 'react-icons/bi';
// ===============================
// ===============================




// Defining an array of navigation links with their paths and display names
const navLinks = [
  {
    path: '/home',        // Link path to Home page
    display: 'Home'       // Display name for the Home page link
  },
  {
    path: '/barbers',     // Link path to 'Find a Barber' page
    display: 'Find a Barber'   // Display name for the 'Find a Barber' page link
  },
  {
    path: '/services',    // Link path to Services page
    display: 'Services'   // Display name for the Services page link
  },
  {
    path: '/contact',     // Link path to Contact page
    display: 'Contact'    // Display name for the Contact page link
  },
  {
    path: 'aboutus',
    display: 'About Us'
  },
]

// Main Header component
const Header = () => {
  const headerRef = useRef(null)  // Reference to the header element
  const menuRef = useRef(null)    // Reference to the navigation menu (used for mobile view)

  // Function to add 'sticky' class to the header when scrolling past 80px
  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')   // Add sticky class when scroll position is greater than 80px
      } else {
        headerRef.current.classList.remove('sticky__header')  // Remove sticky class otherwise
      }
    })
  }
  
  // useEffect hook to call handleStickyHeader when component mounts
  useEffect(() => {
    handleStickyHeader();

    // Cleanup function to remove the scroll event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleStickyHeader)
  });

  // Function to toggle the visibility of the menu (for mobile view)
  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

  return (
    <header className="header flex items-center" ref={headerRef}>  {/* Header with a reference */}
      
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo section */}
          <div>
            <img src={logo} alt="Ecutz Logo" style={{ width: '70px', height: '70px' }} />  {/* Logo image with fixed width/height */}
          </div>

          {/* Navigation menu section */}
          < div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>  {/* Unordered list of navigation links */}
              {/* Map over navLinks array to create list items for each link */}
              {
                navLinks.map((link, index) => 
                  <li key={index}>
                    <NavLink 
                      to={link.path} 
                      className={navClass => navClass.isActive
                        ? 'text-primaryColor text-[16px] leading-7 font-[600]'  // Active link styling
                        : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'  // Default link styling
                      }
                    >
                      {link.display}  {/* Display link name */}
                    </NavLink>
                  </li>
                )
              }
            </ul>
            
          </div>
         
          {/* Right section (User profile and login button) */}
          <div className='flex items-center gap-4'>
            <div className='hidden'>
              <Link to='/'>
                {/* Profile picture of the user */}
                <figure className='w-[35px] rounded-full cursor-pointer'>
                  {/* User profile image */}
                  <img src={userImg} className="w-full rounded-full" alt="The User Image" />  
                </figure>
              </Link>
            </div>

            {/* Login button */}
            <Link to='/login'>
              <button className='bg-primaryColor py-6 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                Login  {/* Button text */}
              </button>
            </Link>

            {/* Menu icon for mobile view */}
            <span className='md:hidden' onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer'/>  {/* Menu icon */}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
