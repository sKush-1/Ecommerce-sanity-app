import React from 'react';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps }) {
  // console.log(process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN)
  return (
   <GoogleOAuthProvider 
   clientId = {`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
 
   >
     <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
   </GoogleOAuthProvider>
  )
}

export default MyApp
