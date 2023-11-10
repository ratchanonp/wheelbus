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
        <RouterProvider router={router} />
      </UserDispatchProvider>
    </UserProvider>
  )
}

export default App
