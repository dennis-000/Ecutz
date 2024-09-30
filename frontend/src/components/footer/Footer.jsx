import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import { RiLinkedinFill } from 'react-icons/ri'
import { AiFillYoutube, AiOutlineInstagram } from 'react-icons/ai';

// Array of social media links with their respective icons
const socialLinks = [
  {
    path: "#",
    icon: <AiFillYoutube className='group-hover:text-white w-4 h-5' />,
  },
  {
    path: "#",
    icon: <AiOutlineInstagram className='group-hover:text-white w-4 h-5' />,
  },
  {
    path: "#",
    icon: <RiLinkedinFill className='group-hover:text-white w-4 h-5' />,
  },
  
];

// Quick link arrays for different sections in the footer
const quickLinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/",
    display: "Blog",
  },
];

const quickLinks02 = [
  {
    path: "/find-a-barber",
    display: "Find a Barber",
  },
  {
    path: "/",
    display: "Request an Appointment",
  },
  {
    path: "/",
    display: "Find a location",
  },
  {
    path: "/",
    display: "Get a Opinion",
  },
];

const quickLinks03 = [
  {
    path: "/",
    display: "Donate",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];



const Footer = () => {

  const year = new Date().getFullYear(); // Get the current year for copyright

  return (
    
    <footer 
    className='pb-16 pt-10  bg-gradient-to-r from-[#CDF0F3] to-[#FFF5DF]'>

 {/* Footer styling */}
    <div className="container">

      <div className='flex justify-between flex-col md:flex-row flex-wrap gap-[30px]'> {/* Layout for footer items */}

        <div>

          <img src={logo} alt="zeal logo" />
          <p className='text-[16px] leading-7 font-[400] text-textColor'>Copyright &copy; {year} developed by Zeal Craft
            Innovation. All right reserved.
          </p>

          {/* Displaying Social media links */}
          <div className='flex items-center gap-3 mt-4'>
            {socialLinks.map((link, index) => (
              <Link
                to={link.path}
                key={index}
                className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center
              justify-center group hover:bg-primaryColor hover:border-none'
              >
                {link.icon} {/* Render the icon */}
              </Link>
            ))}
          </div>
        </div>

            {/* ===== Links 1 ============== */}
        <div>
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
            Quick Links
          </h2>

          <ul>
            {quickLinks01.map((item, index) => (
              // mapping link to it's part....with a uniue key
              <li key={index} className='mb-4'>
                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'
                >
                  {item.display} {/* Display link text */}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        
        {/* ========== Links 2 ============= */}
        <div>
          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
            I want to:
          </h2>

          <ul>
            {quickLinks02.map((item, index) => (
              <li key={index} className='mb-4'>
                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'
                >
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>


        {/* ========== Links 3 ============= */}
        <div>


          <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-headingColor'>
            Support
          </h2>

          <ul>
            {quickLinks03.map((item, index) => (
              <li key={index} className='mb-4'>
                <Link to={item.path} className='text-[16px] leading-7 font-[400] text-textColor'
                >
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
  </footer>
  )
}



export default Footer