import React from 'react';
import heroImg01 from '../assets/images/4.jpg';
import heroImg02 from '../assets/images/2.jpg';
import heroImg03 from '../assets/images/hero-img03.png';

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
                Looking for appointment with a local hairstylist
              </h1>
              <p className='text_para'>Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. A impedit, dolore aliquid aliquam ex omnis accusamus eum
                ducimus sint illum adipisci laudantium. Fugit dignissimos ad consectetur exercitationem. Quaerat,
                ipsam commodi.</p>
            </div>
            {/* Home btn */}
            <button className='btn'>Request an Appointment</button>
          </div>

          {/* =========== Home Page CONTENTS Image ========== */}
          <div className='flex gap-[30px] justify-end'>
            <div>
              <img className='w-[600px] h-[600px] ' src={heroImg01} alt="Fisrt content Image" />
            </div>
            <div className='mt-[30px]'>
              <img src={heroImg02} alt="Second Img" className='w-[200px] h-[150px] mb-[30px]' />
              <img src={heroImg03} alt="Third Img" className='w-full'/>
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

    {/* =========================================== */}
    <section>
      <div className="container">
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>Providing the Best Hair Styling Services
          </h2>
        </div>
      </div>
    </section>

  </>
}

export default Home;