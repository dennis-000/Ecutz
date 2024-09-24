import heroImg01 from '../assets/images/4.jpg';
import heroImg02 from '../assets/images/2.jpg';
import heroImg03 from '../assets/images/3.jpg';
import featureImg from '../assets/images/feature-img1.jpg'
import videoIcon from '../assets/images/video-icon.png'
import avatarIcon from '../assets/images/avatar-icon.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import faqImg from '../assets/images/faq-img1.jpg';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import About from '../components/About/about';
import ServiceList from '../components/Services/ServiceList';
import BarberList from '../components/Barbers/BarberList';
import FaqList from '../components/faq/faqList';
import Testimonial from'../components/Testimonial/Testimonial';

const Home = () => {
  return <>
    {/* ====== Hero Section ========== */}
    <section className='hero__section pt-[60px] 2xl:h-[800px]'>
      <div className="container">
        <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>

          {/* =========== Home Page CONTENTS ========== */}
          <div>
            <div className='lg:w-[570px]'>
              <h1 className='text[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] 
              md:leading-[70px]'>
                Need an Appointment with a Local Barber or Stylist?
              </h1>
              <p className='text_para'>Ecutz is your go-to platform for expert grooming at the University
                of Ghana. From haircuts to beard grooming for men, and stylish hairdos by professional hair stylists
                for women, we offer convenient on-campus services with easy online booking.
              </p>
            </div>
            {/* Home btn */}
            <button className='btn'>Request an Appointment</button>
          </div>

          {/* =========== Home Page CONTENTS Image ========== */}
          <div className='flex gap-[30px] justify-end'>
            <div>
              <img className='w-[250px] h-[400px] rounded-3xl' src={heroImg01} alt="Fisrt content Image" />
            </div>
            <div className='mt-[30px]'>
              <img src={heroImg02} alt="Second Img" className='w-[200px] h-[170px] mb-[30px] rounded-lg' />
              <img src={heroImg03} alt="Third Img" className='w-[200px] h-[150px] mb-[30px] rounded-lg'/>
            </div>
          </div>
        </div>



        {/* homecounter */}
        {/* First Counter */}
        <div className='mt-[30 px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>
          <div>
            <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]
             text-headingColor'>30+
            </h2>
            <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]'> 
            </span>
            <p className='text__para'>Hair Stylists</p>
          </div>

{/* Second Counter */}
          <div>
            <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]
             text-headingColor'>500+
            </h2>
            <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]'> 
            </span>
            <p className='text__para'>Users</p>
          </div>

{/* Third Counter */}
          <div>
            <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700]
             text-headingColor'>100%
            </h2>
            <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]'> 
            </span>
            <p className='text__para'>User Experience</p>
          </div>
          
        </div>
      </div>
    </section>
    {/* ==================== Hero Section End =================== */}

    {/* =================== New Section Container======================== */}
    <section>
      <div className="container">
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>Providing the Best Hair Styling Services
          </h2>
          <p className='text__para text-center'>First-Class Barbers and hair Stylists. View profiles and choose your favorite barber. 
          </p>
        </div>

        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] 
        lg:mt-[55px]'>


          {/* ======= First Illustration ======== */}
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon01} alt="" />
            </div>
            
            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                Find a Stylist Or Barber
              </h2>
              <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                Discover skilled hair stylists and barbers at the University of Ghana. Ecutz allows you to explore profiles,
                view ratings, and choose your ideal professional.
              </p>

              <Link to='/barbers' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto 
              flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <BsArrowRight className='group-hover:text-white w-6 h-5'/>
              </Link>
            </div>
          </div>


          {/* ======= Second Illustration ======== */}
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon02} alt="" />
            </div>
            
            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                Find a Location
              </h2>
              <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                Locate your favorite barbers on campus with Ecutz. Use our map to find barbers near you, check their availability,
                and book a convenient time for your haircut.
              </p>
              <Link to='/barbers' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto 
              flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <BsArrowRight className='group-hover:text-white w-6 h-5'/>
              </Link>
            </div>
          </div>


          {/* ======= Third Illustration ======== */}
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon03} alt="" />
            </div>
            
            <div className='mt-[30px]'>
              <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                Book Appointment
              </h2>
              <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                Scheduling your next haircut is simple with Ecutz. Browse hair stylists and barbers, choose a service, select a time,
                and confirm your appointment—all in a few clicks.
              </p>
              <Link to='/barbers' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto 
              flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <BsArrowRight className='group-hover:text-white w-6 h-5'/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* ===== End Of the New Section Container */}


    {/* ======== About Section Begin ========== */}
    <About/>
    {/* ======== About Section End ========== */}


    {/* ======== Services Section Start ========== */}
    <section>
      <div className="container">
        <div className='xl:w-[470] mx-auto'>
          <h2 className='heading text-center'>Styling and Babering Services</h2>
          <p className='text__para text-center'>
            Ecutz provides on-campus haircuts, trims, beard grooming, and styling.
            Enjoy quick, quality service.
          </p> 
        </div>

      <ServiceList/>
      </div>
</section>
    {/* ======== Services Section End ========== */}

    
    {/* ======== Feature Section ========= */}
    <section>
      <div className='container'>
        <div className='flex items-center justify-between flex-col lg:flex-row'>

          {/* ====== feature content ====== */}
          <div className='xl:w-[670px]'>
            <h2 className='heading'>
              Best Grooming Services <br /> Anytime, Anywhere
            </h2>
            <ul className="pl-4">
              <li className="text__para">
                1. Book your appointment directly with just a few clicks.
              </li>
              <li className="text__para">
                2. Explore and connect with professional barbers available on campus.
              </li>
              <li className="text__para">
                3. Browse our barbers and stylists, view their availability, and
                choose a time that fits your schedule.
              </li> 
            </ul>

            <Link to='/'>
              <button className='btn'>Learn More</button>
            </Link>
          </div>


          {/* ============ feature Image ========== */}
          <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
            <img src={featureImg} className='w-3/4' alt="The Feature Content Image" />

            <div className='w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 
            md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]'>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[6px] lg:gap-3'>
                  {/* ==== Example Appoint Date */}
                  <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor
                  font-[400]'>Tues, 24
                  </p>
                  <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor
                  font-[400]'>10:00AM
                  </p>
                </div>
                <span className='w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center
                bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]'>
                  <img src={videoIcon} alt="Small Video Icon" />
                </span>
              </div>

              {/* ============= Styled Small Text ================= */}
              <div className='w-[75px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px]
              text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[800] mt-2 lg:mt-4
              rounded-s-full'>
                Professional
              </div>

            {/* ======= small Profile Icon Image */}
              <div className='flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]'>
                <img src={avatarIcon} alt="Profile Avartar Icon" />
                <h4 className='text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor'>
                  Saddiq Ahmed
                </h4>
              </div>


            </div>
          </div>


        </div>

      </div>
    </section>

    {/* ============= Feature Section ============== */}
    {/* ============= High Rated OR Recommended Barbers Section START ============== */}
    <section>
      <div className="container">
          <div className='xl:w-[470] mx-auto'>
            <h2 className='heading text-center'>Recommended</h2>
            <p className='text__para text-center'>
              Discover top-rated barbers on campus for expert haircuts, trims, and beard grooming.
              Book now for quality service tailored to your style.
            </p> 
        </div>

        <BarberList/>
      </div>
    </section>
    {/* ============= High Rated OR Recommended Barbers Section END ============== */}


    
    {/* ================== faqs SECTION START ==================*/}
    <section>
      <div className="container">
        <div className='flex justify-between gap-[50px] lg:gap-0'>
          <div className='w-[40%] hidden md:block'>
            <img src={faqImg} alt="faq Image" />
          </div>

          <div className='w-full md:w-1/2'>
            <h2 className='heading'>Most questions by our beloved customers</h2>
            <FaqList/>

          </div>


        </div>
      </div>

    </section>
    {/* ================== faqs SECTION END ==================*/}

    {/* ================== Testimonial SECTION Start ==================*/}
    <section>
      <div className="container">
        <div className='xl:w-[470] mx-auto'>
            <h2 className='heading text-center'>What our clients say</h2>
            <p className='text__para text-center'>
            At Ecutz, we pride ourselves on delivering top-notch barbering
            services to students right on campus.
            </p> 
        </div>
        <Testimonial/>
      </div>
    </section>
    {/* ================== Testimonial SECTION End ==================*/}
  </>
}

export default Home;