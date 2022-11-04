import React, { useRef, useEffect,useState } from 'react'
import useFileUpload from 'react-use-file-upload'
import {Button} from 'kmc-design-system'
import { apiCall } from '../service/APIService'
import { useParams } from 'react-router-dom'


const UploadForm = () => {
    const [data, setData] = useState(null)
    const [clickedVisaId, setClickedVisaId] = useState();
    const {files, setFiles, createFormData, handleDragDropEvent} = useFileUpload();
    const [resType, setResType] = useState()

    const inputRef = useRef();
    
    let { uId } = useParams();
    let tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjZlMWJiZmI2LTU3ODktNGIxZC1hYjg4LWM3NmI5M2JlMmU0NCIsImVtYWlsIjoiZ3Vlc3RAa21jLnNvbHV0aW9ucyIsInVuaXF1ZV9uYW1lIjoiZ3Vlc3RAa21jLnNvbHV0aW9ucyIsInJvbGUiOiJndWVzdCIsIm5iZiI6MTY2NzU1MDU0NSwiZXhwIjoxNjY3NjM2OTQ1LCJpYXQiOjE2Njc1NTA1NDV9.z6vCKV3VKhtZAyAYo5N_5QyTZ_MC-TopH4vmWN-Hi08'

    const headers = {
      "Access-Control-Allow-Origin" : "*",
      "X-Version": "1",
      "Authorization": `Bearer ${tokenStr}`
    }

    const getVisaApplicationById = async() => {
      let webUrl = `${process.env.REACT_APP_ERP_ENDPOINT}/api/Visa/applications/${uId}`
      
      let response = await apiCall(webUrl, "GET", null, { "Access-Control-Allow-Origin" : "*",
      "Content-type": "Application/json",
      "X-Version": "2",
      "Authorization": `Bearer ${tokenStr}`})
  
      if(response.success){
        if(response.status === 200){
          setData(response.data)
        } else if(response.status === 204){
          setResType(response.status)
          console.log(resType)
        }
      }
    }

    useEffect(()=>{
         getVisaApplicationById();
      
  })

  if (!data) return null

  let formData = createFormData();
    const handleFileChange = async (vId) => {
            console.log(files)
          
            for(var i=0; i < files.length; i++){
           
              formData.append("file", files[i], files[i].name)
              let imgUploadUrl = `${process.env.REACT_APP_ERP_ENDPOINT}/api/Azure/blob/upload?folder=visa-applications`

              let resp = await apiCall(imgUploadUrl, "POST", formData, {headers})

              if(resp.success){
                const {data} = resp;
              
                let newFile = {
                  filepath: data,
                  fileName: files[i].name
                }

                await updateRequirementFilepath(vId, newFile.filepath)
              }  
            }
    } 

    const updateRequirementFilepath = async(vId, filePath) => {

            let postBody = {
              filePath: filePath
            }

            let url = `${process.env.REACT_APP_ERP_ENDPOINT}/api/Visa/application-requirements/${vId}/file-paths`;
            let response = await apiCall(url, "PUT", postBody, { "x-version": '2', "Authorization": `Bearer ${tokenStr}` })
            
            console.log('File changed', response)
            getVisaApplicationById();
            
    }
    
    const formSubmitHandler = (e) => {
      e.preventDefault();
    }

  return (
    <div>
    <form onSubmit={formSubmitHandler}>
      <h1 className='font-karla text-md font-bold'>Hello, {data.firstName}</h1>
      <p className='text-xs mb-6'>Please upload your requirements below</p>
      <div className="overflow-x-scroll shadow ring-1 ring-black ring-opacity-5 md:rounded">
        <table className="min-w-full divide-y divide-gray-300 ">
        <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                      Submitted File
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900">
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
            {data.visaApplicationRequirements.length > 0 && data.visaApplicationRequirements.map(d => (
              <tr key={d.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-6">{d.visaRequirementName}</td>
                <td className="w-1/2 py-4  pl-4 pr-3 text-xs font-medium text-branding-pumpkin ">{d.filePath}</td>
                <td className='pr-6 py-4' ><div className='w-full h-full border-2 border-dashed rounded px-6 py-6 flex flex-col mb-2' onDragEnter={handleDragDropEvent} onDragOver={handleDragDropEvent} onDrop={e => {
                       setFiles(e, 'w')
                       setClickedVisaId(d.id)
                       handleFileChange(clickedVisaId, e)
           handleDragDropEvent(e)
     
        }}>
            <p className='text-xs text-gray-600 text-center'>Drag and drop files here</p>
            <span className='text-xs text-gray-600 text-center'>or</span>
            <button className='underline text-xs font-bold text-branding-pumpkin' onClick={() => {
            inputRef.current.click()
            setClickedVisaId(d.id)
            }}>Select a file to upload</button>
        <input type="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" ref={inputRef} style={{ display: 'none' }} 
            onChange={async (target) => { 
            await setFiles(target, 'w')
            await handleFileChange(clickedVisaId, target)
            inputRef.current.value = null     
 
        }}/>
        </div></td>
              </tr>
            )) }
                </tbody>
        </table>
       </div>
        <Button className='w-full mt-4'>Submit Requirements</Button>
 
    </form>
    </div>

  )
}

export default UploadForm