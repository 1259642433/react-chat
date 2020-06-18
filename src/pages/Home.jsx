import React from 'react'
import { useHistory  } from 'react-router-dom'



// import toPage from '../utils'
function Home() {
  let history = useHistory()

  function toPage(url){
      history.push(url)
  }
  return (
    <div className="home" style={{textAlign:'center'}}>
      <h1 >Home</h1>
      <button onClick={()=>toPage('/chat')}>跳转</button>
    </div>
    
  )
}

export default Home