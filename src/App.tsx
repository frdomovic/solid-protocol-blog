import React, { FunctionComponent } from 'react'
import {Header} from './Header'
import {Blog} from './Blog'
import { BrowserSolidLdoProvider } from '@ldo/solid-react'

export const App: FunctionComponent = () => {
  return (
    <div className='App'>
      <BrowserSolidLdoProvider>
        <Header />
        <Blog />
      </BrowserSolidLdoProvider>
    </div>
  )
}
