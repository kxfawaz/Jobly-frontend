import React from 'react'
import {Link} from "react-router-dom"
import "./CompanyList.css"
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";

const CompanyList = ({companies}) => {
  return (
    <div>
    
     
        {companies.map(c=>(
          <Card className='company-list'>
        <CardTitle tag={Link} to={`/companies/${c.handle}`} key={c.handle}>
           {c.name}
        </CardTitle>
        <CardBody>
          <CardText>
          <small>{c.description}</small>
          </CardText>
        </CardBody>
           </Card>
        ))}

   </div>
  )
}

export default CompanyList
