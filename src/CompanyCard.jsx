import React from 'react'
import {Link} from "react-router-dom"
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";

//  RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
const Jobs = ({jobs}) => {
  return (
    <div>
    
     
        {jobs.map(j=>(
          <Card className='company-list'>
        <CardTitle key={j.id}>
           {j.title}
        </CardTitle>
        <CardBody>
          <CardText>
            <div><small> Job Title:{j.title}</small></div>
            <div><small>Salary:{j.salary}</small></div>
            <div><small>Equity: {j.equity}</small></div>
          </CardText>
        </CardBody>
           </Card>
        ))}

   </div>
  )
}