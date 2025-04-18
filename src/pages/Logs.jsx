import React, { useEffect, useState } from 'react'
import BlankPage from '../components/blankPage'
import { LogService } from '../service/Logs'

const Logs = () => {
    const [logs, setLogs] = useState([])
    useEffect(() => {
        fetchLogs()
    }, [])

    const fetchLogs = async() => {
      try {
          const data = await LogService.getLogs()
          console.log(data)
          setLogs(data)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
    <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Sl', 'Log Message'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            
            {logs.map((log, index) => (
                
            <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log}</td>
                </tr> 
            ))}
            </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default Logs