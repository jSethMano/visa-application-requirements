import React, { useRef, useEffect,useState } from 'react'
import useFileUpload from 'react-use-file-upload'
import {Button} from 'kmc-design-system'
import { apiCall } from '../service/APIService'

const UploadForm = (requirementsData) => {
    const [clickedVisaId, setClickedVisaId] = useState();
    const {files, setFiles, createFormData, handleDragDropEvent} = useFileUpload();
    const [fileUploaded, setFileUploaded] =useState(files);
    const inputRef = useRef();
    
    let tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImEwNTAzZjRiLThjY2YtNGFmMi1iYTVlLTYwNjlhZjYzMzg4OCIsImVtYWlsIjoiam9zaHVhLm1hbm9Aa21jLnNvbHV0aW9ucyIsInVuaXF1ZV9uYW1lIjoiam9zaHVhLm1hbm9Aa21jLnNvbHV0aW9ucyIsInJvbGUiOlsic3VwZXJhZG1pbiIsImd1ZXN0Il0sIm5iZiI6MTY2NzQzNDY1NSwiZXhwIjoxNjY3NTIxMDU1LCJpYXQiOjE2Njc0MzQ2NTV9.U_iG4w06DRkY4s_U37VRZGvAuPDj9igqFfVQIxo4AIw'
   
    const headers = {
      "Access-Control-Allow-Origin" : "*",
      "X-Version": "1",
      "Authorization": `Bearer ${tokenStr}`
    }

    useEffect(()=>{
       
        setFileUploaded(files)
        console.log(fileUploaded)
    },[files, fileUploaded])

    const handleFileChange = async (vId, target) => {

            let formData = createFormData();
        
            for(var i=0; i< fileUploaded.length; i++){
         
                formData = createFormData();
                formData.append("file", fileUploaded[0], fileUploaded[0].name)
                let imgUploadUrl = `${process.env.REACT_APP_ERP_ENDPOINT}/api/Azure/blob/upload?folder=visa-applications`
  
                let resp = await apiCall(imgUploadUrl, "POST", formData, {headers})
  
                if(resp.success){
                  const {data} = resp;
                
                  let newFile = {
                    filepath: data,
                    fileName: fileUploaded[0].name
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
            
    }
    
    const formSubmitHandler = (e) => {
      e.preventDefault();
    }

  return (
    <form onSubmit={formSubmitHandler}>
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
            {requirementsData.requirementsData.length > 0 && requirementsData.requirementsData.map(d => (
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
            onChange={(target) => { 
            setFiles(target, 'w')
            handleFileChange(clickedVisaId, target)
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
  )
}

export default UploadForm