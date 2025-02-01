import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className=' 
  position-absolute;
 flex 
 md:flex-col           
 justify-evenly 
w-screen         
md:w-[1400px]
md:h-[440px]    
h-[50em]
py-8

bg-slate-500 bg-opacity-25
text-black
'>

{ /* sub container */}
<div className='  
grid
grid-flow-row
md:grid-cols-5
justify-center      
position-absolute       
w-[1100px]   
h-[236px]     
ml-[35px]  
top-[80px]              
'>

{/*frame1 open*/}
<div className=' 
 flex
 flex-col
 items-start
 md:p-0 sm:pb-2
 gap-[16px]   
text-[10px]
md:text-[14px]
'>
{/*text-frame1 open tag*/} 
<h1 className='font-extrabold text-xl md:text-2xl'>SHOP.CO </h1>
<h3 className='text-wrap'>We have clothes that suits your style<br/> and which you are proud to wear.<br/> From women to men.</h3>
<div className='
flex
flex-row
flex-start
p-0
pt-2        
md:gap-[24px]  sm:gap-2

md:w-[168px]    sm:w-[20px]
md:h-[30px]

'>
  <Image src="/footer/1.png" alt='twitter' width={26} height={26}/>
  <Image src="/footer/2.png" alt='facebook' width={26} height={26}/>
  <Image src="/footer/3.png" alt='instagram' width={26} height={26}/>
  <Image src="/footer/4.png" alt='linkedIn' width={26} height={26}/>

</div>
</div>
{/* frame2 open*/}
<div className=' 
flex
flex-col
gap-4
ml-3
mt-2
md:mr-4
text-[10px]
md:text-[16px]
'>
  <h1 className='font-extrabold md:font-bold '> Company</h1>
  <a href="/about">About</a>
  <p>Features</p>
  <p>Career</p>
  <a href='/contact-us' className='text-black'>Contact Us</a>
</div>

{/* frame3 open*/}
<div className='
flex
flex-col
gap-[24px]    sm:gap-2
text-[10px]
mt-2
md:text-[16px]
'>
<h1 className='font-extrabold md:font-bold'>Help</h1>
<p>Customer Support</p>
<p>Delivery Details</p>
<p>Terms & Conditions</p>
<p>Privacy Policy</p>

</div>

{/* frame4 open*/}
<div className='
flex
flex-col
gap-[24px]    sm:gap-2
text-[10px]
mt-1
md:text-[16px]
'>
<h1 className='font-extrabold md:font-bold'>FAQ</h1>
<p>Account</p>
<p>Manage Deliveries</p>
<p>Orders</p>
<p>Payments</p>

</div>
{/* frame4 close*/}
{/* frame5 open*/}
<div>
  <div className='
flex
flex-row'>
  <div className='
flex
flex-col
gap-[7px]    
text-[10px]
md:text-[16px]
sm:pt-1
'>
    <h1 className='font-extrabold md:font-bold'> Resources</h1>
    <p>Free eBooks</p>

<p>Development Tutorial</p>

<p>How to - Blog</p>

<p>Youtube Playlist</p>
  </div>
  </div>
  <div className='
flex
flex-row   
gap-[3px]
mt-7
-ml-16
w-[168px]       
h-[30px]       

'>
  <Image src="/footer/Badge.png" alt='vs1' width={42} height={2}/>
  <Image src="/footer/Badge(1).png" alt='vs2' width={42} height={2}/>
  <Image src="/footer/Badge(2).png" alt='vas3' width={42} height={2}/>
  <Image src="/footer/Badge(3).png" alt='vas4' width={42} height={2}/>

</div>

</div>
{/* frame5 close*/}

{/*sub-main*/}</div>
      
    {/*main*/}</div> 
  )
}

export default Footer
