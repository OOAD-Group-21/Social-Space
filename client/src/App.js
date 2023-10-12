import React ,{useEffect, useState} from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div>

    {(typeof backendData.devs === 'undefined') ? (
      <p>Loading...</p>
    ): (
      backendData.devs.map((dev,i) => (
        <p>{dev}</p>
      ))
    )}

    </div>
  )
}

export default App