
import { barbers } from '../../assets/data/barbers'
import BarberCard from './BarberCard'

const BarberList = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-[30px] mt-[30px] 
    lg:mt-[55px]'>
      {barbers.map((barber) =>
        <BarberCard key={barber.id} barber={barber} />)}</div>
  )
}

export default BarberList