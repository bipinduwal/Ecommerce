import React from 'react'
import Carousel from '../components/Home/Carousel'
import FlashSale from '../components/Home/FlashSale'
// import Category from '../components/Home/Category'
import CategoryPage from './Category'

const Home = () => {
  return (
    <>
     <Carousel/> 
     <FlashSale/>
     <CategoryPage/>
    </>
  )
}

export default Home
