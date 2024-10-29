import BarberCard from "./../../components/Barbers/BarberCard";
import { barbers } from "./../../assets/data/barbers";
import Testimonial from "../../components/Testimonial/Testimonial";
const Barbers = () => {
  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Barber</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center
          justify-between">

          {/* ====== Search ======= */}
            <input type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer
            placeholder:text-textColor"
              placeholder="Search Barber/Stylists"
            />
              {/* ===== Button ======= */}
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'> {/* Grid container for the barber cards */}
      
            {/* Mapping through the barbers array and rendering a BarberCard for each barber */}
            {barbers.map((barber) =>
              <BarberCard key={barber.id} barber={barber} />// Each card needs a unique key
            )}

          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className='xl:w-[470px] mx-auto'>
              <h2 className='heading text-center'>What our clients say</h2>
              <p className='text__para text-center'>
              At Ecutz, we pride ourselves on delivering top-notch barbering
              services to students right on campus.
              </p> 
          </div>
          <Testimonial/>
        </div>
      </section>
    </>
  );
};

export default Barbers