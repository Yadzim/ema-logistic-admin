import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './stores/index.ts'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  }
});

import "config/i18n"
import { ConfigProvider } from 'antd';
import { antdCustomTokens } from 'utils/constants.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ConfigProvider theme={antdCustomTokens()} >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)