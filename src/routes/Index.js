import React from 'react'
import DescriptionContainer from '../components/index/DescriptionContainer'
import SearchContainer from '../components/index/SearchContainer'
import WelcomeDisplay from '../components/index/WelcomeDisplay'

const Index = () => {
  return (
    // TODO hide the welcome message if the user is logged in
    <div>
      <WelcomeDisplay />
      <SearchContainer />
      <DescriptionContainer />
    </div>
  )
}

export default Index