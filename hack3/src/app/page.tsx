import React from 'react'
import NewArrivals from '@/components/LandingPage/NewArrivals'
import Banner from '@/components/LandingPage/Banner'
import BrowseDress from '@/components/LandingPage/BrowseDress'
import BrandsAds from '@/components/LandingPage/BrandAds'
import TopSell from '@/components/LandingPage/TopSell'
const HomePage = () => {
  return (
    <div>
      <Banner/>
      <BrandsAds/>
      <NewArrivals/>
      <TopSell/>
      <BrowseDress/>
    </div>
  )
}

export default HomePage
