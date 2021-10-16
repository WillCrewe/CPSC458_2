import Head from 'next/head'
import Greeting from '../components/Greeting'
import History from '../components/History';
import Input from '../components/Input';
import { useState } from 'react';


export default function Home() {
  const [user, setUser] = useState({
    "name": "William",
    "email": "crewe@chapman.edu",
  });
  const [gratitudes, setGratitudes] = useState([]);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);

  const addGratitude = (entry) => {
    let newGratitudes = [...gratitudes, entry]
    setHasSubmittedToday(true)
    setGratitudes(newGratitudes)
  }

  return (
    <div className="bg-red-300 min-h-screen min-w-screen">
      <Head>
        <title>My Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-prose px-4 pt-12">
        <Greeting 
          user = {user}
          gratitudes = {gratitudes}
          hasSubmittedToday = {hasSubmittedToday}
        ></Greeting>
        <Input 
          handleSubmit = {addGratitude}
          hasSubmittedToday = {hasSubmittedToday}
        >
        </Input>
        <History
          gratitudes = {gratitudes}
        ></History>
      </main>
    </div>
  )
}
