import React from 'react'

const Footer1 = () => {
  return (

      <div className=' grid rounded-2xl bg-black text-white w-screen md:w-[1400px] h-auto
       sm:h-32'> 
<h1 className=' xl:text-3xl sm:text-xl  font-extrabold xl:ml-20 ml-5 pt-4

sm:grid items-center'>STAY UPTO DATE ABOUT<br/> OUR LATEST OFFERS</h1>
<input type='email' placeholder='Enter your email address' 
className='xl:w-80 xl:h-10 sm:w-[245px] sm:h-5 md:w-[228px]    bg-slate-200 text-black 
rounded-full md:ml-[50em] sm:ml-[25em] text-center xl:mb-2 md:-mt-20 '/> 

<button className='xl:w-80 sm:w-[245px] md:w-60 xl:h-10 sm:h-5 bg-slate-200 md:-mt-5 
text-black rounded-full  md:ml-[50em] sm:ml-[400px] xl:mb-5'> Subscribe to Newsletter </button>


    </div>
  )
}

export default Footer1
