import { APIProvider } from '@vis.gl/react-google-maps'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useReducer } from 'react'
import { RouterProvider } from 'react-router-dom'
import { PlaceSuggestionContextProvider, PlaceSuggestionReducerProvider, initialPlaceSuggestionContextData, placeSuggestionReducer } from './contexts/PlaceSuggestionContext'
import { DirectionRendererDispatchProvider, DirectionRendererProvider, directionRendererReducer } from './contexts/RouteContext'
import { SearchContextProvider, SearchDispatchProvider, initialSearchContextData, searchReducer } from './contexts/SearchContext'
import { UserDispatchProvider, UserProvider, initialUserState, userReducer } from './contexts/UserContext'
import { auth } from './firebase/firebase'
import router from './routes/router'



function App() {

  const [userData, userDispatch] = useReducer(userReducer, initialUserState);
  const [directionRenderer, directionRendererDispatch] = useReducer(directionRendererReducer, {} as never);
  const [searchData, searchDispatch] = useReducer(searchReducer, initialSearchContextData);
  const [placeSuggestions, placeSuggestionsDispatch] = useReducer(placeSuggestionReducer, initialPlaceSuggestionContextData);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      userDispatch({ type: 'SET_USER', payload: user })
    })
  }, [])

  return (
    <UserProvider value={userData}>
      <UserDispatchProvider value={userDispatch}>
        <DirectionRendererProvider value={directionRenderer}>
          <DirectionRendererDispatchProvider value={directionRendererDispatch}>
            <SearchContextProvider value={searchData}>
              <SearchDispatchProvider value={searchDispatch}>
                <PlaceSuggestionContextProvider value={placeSuggestions}>
                  <PlaceSuggestionReducerProvider value={placeSuggestionsDispatch}>
                    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                      <RouterProvider router={router} />
                    </APIProvider>
                  </PlaceSuggestionReducerProvider>
                </PlaceSuggestionContextProvider>
              </SearchDispatchProvider>
            </SearchContextProvider>
          </DirectionRendererDispatchProvider>
        </DirectionRendererProvider>
      </UserDispatchProvider>
    </UserProvider>
  )
}

export default App
