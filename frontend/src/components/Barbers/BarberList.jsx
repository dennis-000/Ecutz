
import { barbers } from '../../assets/data/barbers'
import BarberCard from './BarberCard' // Importing the BarberCard component


const BarberList = () => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] 
    lg:mt-[55px]'> {/* Grid container for the barber cards */}
      
      {/* Mapping through the barbers array and rendering a BarberCard for each barber */}
      {barbers.map((barber) => (
  <BarberCard key={barber.id} barber={barber} />
))}
    </div>
  );
};

export default BarberList