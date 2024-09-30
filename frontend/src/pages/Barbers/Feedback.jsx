import avatar from '../../assets/images/avatar-icon.png';
import { formatDate } from '../../utils/formateDate';
import { AiFillStar } from 'react-icons/ai';
import { useState } from 'react';
import FeedbackForm from './FeedbackForm';

const Feedback = () => {

    const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  return (
      <div>
          <div className="mb-[50px]">
              <h4 className="text-[20px] leading-[30px] font-bold text-headingColor">
                  All reviews (272)
              </h4>

              <div className="flex justify-between gap-10 mb-[30px]">
                  <div className="flex gap-3">
                      <figure className="w-10 h-10 rounded-full">
                          <img className="w-full" src={avatar} alt="" />
                      </figure>

                      <div>
                          <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>
                              Sadiqq Ahmed
                          </h5>
                          <p className='text-[14px] leading-6 text-textColor'>
                              {formatDate('12-04-2010')}
                          </p>
                          <p className='text__para mt-3 font-medium text-[15px]'>
                              Good Services, highly recommended 👌
                          </p>
                      </div>
                  </div>

                    {/* ==== Rating Stars ===== */}
                  <div className='flex gap-1'>
                      {[...Array(5).keys()].map((...index) => (
                          <AiFillStar key={index} color='#0067FF' />
                      ))}
                  </div>
              </div>
          </div>

            {/* === Give Feedback btn ==== */}
          {!showFeedbackForm &&
              <div className='text-center'>
                  <button className='btn' onClick={() => setShowFeedbackForm(true)}>
                      Give Feedback
                  </button>
              </div>}
          
          {showFeedbackForm && <FeedbackForm/>}
    </div>
  )
}

export default Feedback;