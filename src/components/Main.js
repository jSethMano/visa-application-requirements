import React, {useState, useEffect} from 'react'
import UploadForm from './UploadForm'
import { useParams } from 'react-router-dom'
import { apiCall } from '../service/APIService'

const Main = () => {
  const [data, setData] = useState(null)

  let { uId } = useParams();
  
  let tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjZlMWJiZmI2LTU3ODktNGIxZC1hYjg4LWM3NmI5M2JlMmU0NCIsImVtYWlsIjoiZ3Vlc3RAa21jLnNvbHV0aW9ucyIsInVuaXF1ZV9uYW1lIjoiZ3Vlc3RAa21jLnNvbHV0aW9ucyIsInJvbGUiOiJndWVzdCIsIm5iZiI6MTY2NzQ1OTIwNywiZXhwIjoxNjY3NTQ1NjA3LCJpYXQiOjE2Njc0NTkyMDd9.bCNI7fTGkOOWgUTRPpkc6sIdmA1iy-85cPo0ah_cN50'

  useEffect(()=>{
      console.log(uId)

      const getVisaApplicationById = async() => {
        let webUrl = `${process.env.REACT_APP_ERP_ENDPOINT}/api/Visa/applications/${uId}`
        
        let response = await apiCall(webUrl, "GET", null, { "Access-Control-Allow-Origin" : "*",
        "Content-type": "Application/json",
        "X-Version": "2",
        "Authorization": `Bearer ${tokenStr}`})
    
        if(response.success){
          if(response.status === 200){
            setData(response.data)
          }
        }
      }

         getVisaApplicationById();
  
  },[tokenStr, uId])

  
  


  if (!data) return null

  console.log(data)

  return (
    <div className='px-4 py-4 bg-white rounded'>
      <h2 className='text-lg font-bold'>Hello, {data.clientPOC.firstName}</h2>
      <p className='text-xs text-gray-600 mb-2'>Please refer to list below for the requirements</p>
      <UploadForm requirementsData={data.visaApplicationRequirements}/>
    </div>
  )
}

export default Main