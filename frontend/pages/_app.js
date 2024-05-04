// pages/_app.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import store from '../utils/api/redux/store';
 import '../styles/globals.css';
import { getInitialState } from '../utils/api/getInitialState';
import Layout from '../components/layout/index'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  // Get the initial state from the getInitialState function
  const initialState = getInitialState();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      {/* Render the initial state on the client-side */}
        <Hydrate state={pageProps.dehydratedState}>
         <React.StrictMode>
         <Layout>
        <Component {...pageProps} isLoggedIn={initialState.isLoggedIn} />
        </Layout>
      </React.StrictMode>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;