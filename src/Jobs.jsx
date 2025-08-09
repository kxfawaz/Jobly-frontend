import React from 'react'
import {Link} from "react-router-dom"
import "./Jobs.css"
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";

//  RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
const Jobs = ({jobs, handleApply, applications}) => {
  
  return (
    <div>
        <h4>Jobs:</h4>
        {jobs.length  > 0 ?  
        <ListGroup className='job-title'>
            {jobs.map(j=>(
                <Card key={j.id}>
                    <CardTitle >{j.title}</CardTitle>
                    <CardBody>
                        <CardBody>
                            <div>Salary: {j.salary}</div>
                            <div>Equity:{j.equity}</div>
                        </CardBody>
                       {applications.includes(j.id) ?
                        <button >Applied</button>
                      : <button onClick={() => handleApply(j.id)}>Apply</button> }
                        
                    </CardBody>
              </Card>
            ))}
        </ListGroup>
        : <div>No jobs available</div> }
        

   </div>
  )
}

export default Jobs
