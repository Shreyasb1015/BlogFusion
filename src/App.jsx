import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import './App.css'
import {login,logout} from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  //Remember that whenever we make changes to the .env file, we need to restart the development server to see the changes.
  //When we create app using create-react-app, we can access the environment variables using process.env. and it is mandatory to prefix the environment variables with REACT_APP_.
  //But in vite, we can access the environment variables using import.meta.env and  need to prefix the environment variables with VITE_.
  //console.log(import.meta.env.VITE_APPWRITE_URL)


  //We will now create loading state 
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData)
        {
            dispatch(login({userData}))
        }
        else{

          dispatch(logout())
        }
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
            TODO:<Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  ):null;
}

export default App
