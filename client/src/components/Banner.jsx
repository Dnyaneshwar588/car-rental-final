import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Banner = () => {
  const navigate = useNavigate()
  const { isOwner } = useAppContext()

  return (
    <motion.section 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className='flex flex-col md:flex-row md:items-center items-center justify-between px-8 md:px-14 py-10 bg-gradient-to-r from-[#FF8A1E] via-[#F16C00] to-[#0E7C3A] max-w-6xl mx-3 md:mx-auto rounded-3xl overflow-hidden relative'>

      <div className='text-white max-w-xl'>
        <span className='text-xs uppercase tracking-[0.2em] text-white/80'>For owners</span>
        <h2 className='text-3xl md:text-4xl font-semibold mt-2'>Turn your car into steady income</h2>
        <p className='mt-3 text-white/90'>List your car in minutes. We handle insurance, driver verification, and secure payments.</p>

        <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(isOwner ? '/owner' : '/owner/login')}
        className='px-6 py-2.5 bg-white hover:bg-[#FFF1D6] transition-all text-[#0E7C3A] rounded-xl text-sm mt-6 cursor-pointer'>List your car</motion.button>
      </div>

      <motion.img 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      src={assets.banner_car_image} alt="car" className='max-h-52 mt-8 md:mt-0'/>
      
    </motion.section>
  )
}

export default Banner
