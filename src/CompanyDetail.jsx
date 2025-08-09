import React from 'react'
import {useParams , Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import JoblyApi from './api'
import Jobs from './Jobs'
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap"
const CompanyDetail = ({applications, handleApply}) => {

    const [company, setCompany] = useState(null)
    const {handle} = useParams()

    useEffect(()=>{
        async function fetchCompany(){
            const data = await JoblyApi.getCompany(handle)
            setCompany(data)
        }
        fetchCompany()
    },[handle])
    if (!company) return <p>Loading company...</p>;

  return (
  <>
        
        <CardTitle>{company.name}</CardTitle>
        <CardText>{company.description}</CardText>
        <Jobs jobs={company.jobs} applications={applications} handleApply={handleApply}/>
 </>

        
  )}


  
  
        


   



export default CompanyDetail
