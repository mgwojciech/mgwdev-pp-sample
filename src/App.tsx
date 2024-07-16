import * as React from 'react'
import { AuthenticationContextProvider } from './context/AuthenticationContext'
import { DataverseContextProvider } from './context/DataverseContext'
import { GraphContextProvider } from './context/GraphContext'
import { Button, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { GraphPersona } from './components/GraphPersona';
import { DataverseAppUsers } from './components/DataverseAppUsers';

const clientId = import.meta.env.VITE_FRONTEND_CLIENT_ID
const dataverseResource = import.meta.env.VITE_DATAVERSE_ENV
function App() {

  return (
    <FluentProvider theme={webLightTheme}>
      <AuthenticationContextProvider msalAuthConfig={{
        clientId
      }} >
        <GraphContextProvider>
          <DataverseContextProvider dataverseResource={dataverseResource}>
            <>
              <GraphPersona />
              <DataverseAppUsers />
            </>
          </DataverseContextProvider>
        </GraphContextProvider>
      </AuthenticationContextProvider>
    </FluentProvider >
  )
}

export default App
