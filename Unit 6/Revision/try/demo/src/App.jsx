import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [jobIds, setJobIds] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchJobIds = async () => {
    try {
      const res = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json")
      const data = await res.json()
      setJobIds(data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const fetchJobDetails = async (ids) => {
    try {
      const promises = ids.map((id) => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) => res.json()))
      const results = await Promise.all(promises)
      setJobs(results)
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobIds()
  }, [])

  useEffect(() => {
    if (jobIds.length > 0) {
      fetchJobDetails(jobIds)
    }
  }, [jobIds])


  return (
    <>
      {loading && <p>Loading...</p>}

      {!loading && (
        <ul>
          {jobs.map((job) => (<li key={job.id}>
            <h3>{job.title}</h3>
          </li>))}
        </ul>
      )}
    </>
  )
}

export default App
