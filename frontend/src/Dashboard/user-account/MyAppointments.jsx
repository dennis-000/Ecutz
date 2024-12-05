import useFetchData from "../../hooks/useFetchData"
import { BASE_URL } from "../../config"
import BarberCard from "../../components/Barbers/BarberCard";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
const MyAppointments = () => {


  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}appointments`)
  
  console.log('Appointments Data:', { appointments});
  return (
    <div>
          {loading && !error && <Loading/>}

          { error && !loading && <Error errMessage={error}/>}

          {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {
              appointments.map(appointment=> (
              <BarberCard key={appointment._id} barber={appointment}/>
            ))
            }
            
            </div>
            )}

            {!loading && !error && appointments.length === 0 && 
            <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold 
            text-primaryColor">
              You have not made any appointments</h2>
            }
    </div>
  )
}

export default MyAppointments;