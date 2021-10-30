import Head from 'next/head'
import GratitudeApp from '../components/GratitudeApp';
import { Auth } from '@supabase/ui';
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react';


export default function Home() {
  // gets the logged in user from the Auth.UserContextProvider
  //If no user is detected, user is NULL
  //Otherwise it is the user
  const { user } = Auth.useUser()
  return (
    <div className="bg-red-300 min-h-screen min-w-screen">
      <Head>
        <title>My Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto max-w-prose px-4 pt-12">
        {
          user ? (
            <div className="container mx-auto max-w-prose px-4">
              <GratitudeApp user={user} />
              <div id="spacer" className="h-12"/>
              <button
                className="text-blue-300 font-semibold"
                onClick={async () => {
                  const { error } = await supabase.auth.signOut()
                  if (error) console.log('Error logging out:', error.message)
                }}
            >
              Logout
            </button>
          </div>
          ) : (
            <div className="bg-white">
            <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge"></Auth>
          </div>
          )
        }
      </main>
    </div>
  )
}
