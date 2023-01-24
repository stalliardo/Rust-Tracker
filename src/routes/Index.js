import React from 'react'
import SearchContainer from '../components/index/SearchContainer'
import WelcomeDisplay from '../components/index/WelcomeDisplay'

const Index = () => {
  return (
    // TODO hide the welcome message if the user is logged in
    <div>
      <WelcomeDisplay />
      <SearchContainer />
    </div>
  )
}

export default Index