import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const FeaturedSection = () => {



    const navigate = useNavigate()
    const {cars} = useAppContext()

  return (
    <motion.section 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className='relative flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden'>

      <div className='absolute -top-24 -left-16 h-64 w-64 rounded-full bg-[#FF8A1E]/15 blur-3xl' />
      <div className='absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[#0E7C3A]/15 blur-3xl' />

        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className='w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6'
        >
            <Title title='Featured Rides Across India' subTitle='Explore premium cars handpicked for city drives, hill escapes, and long road trips.' align='left'/>
            <button
              onClick={()=> {
                navigate('/cars'); scrollTo(0,0)
              }}
              className='flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF8A1E] text-white rounded-lg hover:bg-[#F16C00] transition'
            >
              View all cars <img src={assets.arrow_icon} alt="arrow" className='brightness-200'/>
            </button>
        </motion.div>

        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mt-14'>
        {
            cars.slice(0,6).map((car)=> (
                <motion.div key={car._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut"  }}
                >
                    <CarCard car={car}/>
                </motion.div>

            ))
        }
        </motion.div>

    </motion.section>
  )
}

export default FeaturedSection




