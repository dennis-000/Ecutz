
import aboutImg from '../assets/images/ecutz.png';
import aboutCardimg from '../assets/images/about-card1.png';
import { Link } from 'react-router-dom';

    function Aboutus() {
        return <section>
        <div className="container">
            <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
                {/* ============= ABOUT IMAGE ========= */}
                <div className='relative w-3/4 lg:w-1/2 xl:w-[550px] z-10 order-1 lg:order-2'>
                    <img src={aboutImg} alt="About Ecutz Image" />
                    <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[-22%]'>
                        <img src={aboutCardimg} alt="Card Testimonial" />
                    </div>
                </div>

                {/* =========== About Content ============ */}
                <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                    <h2 className='heading'>Ecutz: Simplifying Haircuts and Styling for Students on Campus</h2>
                    <p className='text__para'>
                        Ecutz is a convenient on-campus grooming app designed for students.
                        It connects users with skilled hair stylists and barbers, allowing them to easily book personalized grooming services. With features
                        like profile browsing appointment scheduling, and location finding, Ecutz makes
                        getting a fresh cut or style effortless and accessible.
                    </p>
                        {/* ========= FOR MORE THEN UNCOMMENT =========== */}
                    {/* <p className='text__para mt-[30px]'>
                        This is a grooming app designed for students,
                        connecting them with skilled barbers and hair stylists on campus. With features
                        like profile browsing, appointment scheduling, and location finding, students can
                        easily book services and get a fresh cut or style with just a few taps.
                        Ecutz makes on-campus grooming quick, convenient, and hassle-free.
                    </p> */}
                    <Link to="/about">
                        <button className='btn'>Learn More</button>
                    </Link>
                </div>
            </div>  
            </div>
            

            <div className="container">
                <div className='flex justify-end gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
                {/* ============= ABOUT IMAGE ========= */}
                    <div className='relative w-3/4 lg:w-1/2 xl:w-[550px] z-10 order-1 lg:order-2'>
                        <img src={aboutImg} alt="About Ecutz Image" />
                        {/* <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[-22%]'>
                            <img src={aboutCardimg} alt="Card Testimonial" />
                        </div> */}
                    </div>
                </div>
            </div>
  </section>
};

export default Aboutus