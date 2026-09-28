import { useEffect, useState } from 'react'
import { checkHealth } from './services/api'

function App() {
  const [status, setStatus] = useState<string>('Checking backend...')
  const [timestamp, setTimestamp] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    checkHealth()
      .then(data => {
        setStatus('Backend connected')
        setTimestamp(data.timestamp)
        setError(false)
      })
      .catch(err => {
        console.error(err)
        setStatus('Backend not reachable')
        setError(true)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center p-4">
      <main className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">PROJECT_NAME</h1>
        
        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
          <p className="text-sm font-medium mb-1">
            Status:{' '}
            <span className={error ? 'text-red-600 font-bold' : 'text-green-600 font-bold'} aria-live="polite">
              {status}
            </span>
          </p>
          {timestamp && (
            <p className="text-xs text-gray-500 mt-2">
              Server time: {timestamp}
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
