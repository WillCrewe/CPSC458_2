// components/GratitudeApp.js
import Greeting from './Greeting'
import History from './History';
import Input from './Input';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';


export default function GratitudeApp({ user }) {

  const [gratitudes, setGratitudes] = useState([]);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // run the fetchGratitudes function
    // after the initial render of the app
    // so we have access to the logged in user
    fetchGratitudes()
  }, [loading])

  const fetchGratitudes = async () => {
    // get the gratitudes data from supabase 
    // set the value of gratitudes state to that data

    let { data: gratitudes, error } = await supabase
      .from('gratitudes')
      .select('entry, date_insert_ts')

      if (!error) {
        /* Checking date/time for 24 /hours */
        let currTime = new Date().getTime()
        let mostRecentRecord = new Date(gratitudes.slice(-1)[0].date_insert_ts).getTime()
        let hoursSinceLastSubmission = (mostRecentRecord - currTime) / 3600000
        let didSubmitToday = hoursSinceLastSubmission < 24
        setGratitudes(gratitudes)
        setHasSubmittedToday(didSubmitToday)
        setLoading(false)
      } else {
        //there was an error
        console.log(error)
        setLoading(false)
        setError(error)
      }
  }

  const addGratitude = async (entry) => {
    const { data, error } = await supabase
      .from('gratitudes')
      .insert([
        { id: user.id, entry: entry },
    ])
    setLoading(true)
    if (error) { 
      console.log(error)
      setError(error) 
    } else {
      // setGratitudes([...gratitudes, {'entry': entry, 'date_insert_ts': null}])
      setLoading(false)
      setHasSubmittedToday(true)
    }
  }

  /* Application is still fetching data */
  if (loading) {
    return <p>Loading...</p>
  }

  /* While fetching data, an error was returned */
  if (error) {
    return <p>{error}</p>
  }


  return (
    <div className="bg-red-300 min-h-screen min-w-screen">
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
