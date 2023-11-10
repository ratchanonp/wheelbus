import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Import fonts from fontsource
import '@fontsource/prompt/100.css'
import '@fontsource/prompt/200.css'
import '@fontsource/prompt/300.css'
import '@fontsource/prompt/400.css'
import '@fontsource/prompt/500.css'
import '@fontsource/prompt/600.css'
import '@fontsource/prompt/700.css'
import '@fontsource/prompt/800.css'
import '@fontsource/prompt/900.css'

import '@fontsource/sarabun/100.css'
import '@fontsource/sarabun/200.css'
import '@fontsource/sarabun/300.css'
import '@fontsource/sarabun/400.css'
import '@fontsource/sarabun/500.css'
import '@fontsource/sarabun/600.css'
import '@fontsource/sarabun/700.css'
import '@fontsource/sarabun/800.css'

import theme from './theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
