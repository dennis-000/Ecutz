import { useState } from 'react';
import starIcon from '../../assets/images/Star.png'
import doctorImg from '../../assets/images/doctor-img02.png'
import BarberAbout from './BarberAbout';
import Feedback from './Feedback';
import SidePanel from './SidePanel';

const BarbersDetails = () => {

  const [tab, setTab] = useState('about')

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className='grid md:grid-cols-3 gap-[50px]'>

          <div className='md-col-span-2'>
            <div className='flex items-center gap-5'>
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={doctorImg} alt="" />
              </figure>

              <div>
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 
              lg:px-6 text-[10px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                  Grooming
                </span>
                <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold'>
                  Sadiqq Ahmed
                </h3>

                <div className='flex items-center gap-[6px]'>
                  {/* ==== for rating Icon */}
                  <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px]
                lg:leading-2 font-semibold text-headingColor'>
                    <img src={starIcon} alt="" />4.0
                  </span>

                  <span className='text-[14px] leading-5 lg:text-[16px]
                lg:leading-7 font-[400] text-textColor'>
                    (272)
                  </span>
                </div>

                <p className='text-para text-[14px leading-5 md:text-[15px] lg:max-w-[390px]'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Facere consequatur nulla,
                </p>
              </div>
            </div>
            
            {/* ========= About ====== */}
            <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
              <button
                onClick={() => setTab('about')}
                className={`${tab === 'about' && 'border-b solid border-primaryColor'} py-2 px-5 mr-5 
                  text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>
              {/* ========= Feedback ====== */}
              <button
                onClick={() => setTab('feedback')}
                className={`${tab === 'feedback' && 'border-b solid border-primaryColor'} py-2 px-5 mr-5 
                  text-[16px] leading-7 text-headingColor font-semibold`}              >
                Feedback
              </button>
            </div>

            <div className='mt-[50px]'>
              {
                tab==='about' && <BarberAbout/>
              }
              {
                tab==='feedback' && <Feedback />
              }
            </div>

          </div>

          <div>
            <SidePanel/>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BarbersDetails;