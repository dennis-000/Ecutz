
import { services } from './../../assets/data/services'
import ServiceCard from '../Services/ServiceCard'

const BarberServices = () => {
    return (
      <section>
            {/* <div>BarberServices</div> */}
        <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px]'>
      
          {/* {services.map((item, index) =>
            <ServiceCard
              item={item} index={index} key={index}
          /> */}
          {services.map((item) => (
            <ServiceCard item={item} key={item.id} />
          ))}          
          {/* )} */}
        </div>
        </section>
  )
}

export default BarberServices