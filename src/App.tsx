import { APIProvider } from '@vis.gl/react-google-maps'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useReducer } from 'react'
import { RouterProvider } from 'react-router-dom'
import { UserDispatchProvider, UserProvider, initialUserState, userReducer } from './contexts/UserContext'
import { auth } from './firebase/firebase'
import router from './routes/router'



function App() {

  const [userData, dispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'SET_USER', payload: user })
    })
  }, [])

  return (
    <UserProvider value={userData}>
      <UserDispatchProvider value={dispatch}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <RouterProvider router={router} />
        </APIProvider>
      </UserDispatchProvider>
    </UserProvider>
  )
}

export default App
