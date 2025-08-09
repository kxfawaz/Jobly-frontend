import React from "react";
import { Route,Routes} from "react-router-dom"
import Homepage from "./Homepage";
import Jobs from "./Jobs";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail"
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";



const ReactRoutes = ({companies, jobs, login, signup, currentUser, handleApply, applications}) => {

    return(
        
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/companies" element={<CompanyList companies={companies}/>}/>
            <Route path="/companies/:handle" element={<CompanyDetail
             companies={companies}
             jobs={jobs}
             applications={applications}
             handleApply={handleApply}
             basePath="companies"
             />}/>
            <Route path="/jobs" element={<Jobs jobs={jobs} handleApply={handleApply} applications={applications}/>}/>
            <Route path="/profile" element={<ProfileForm currentUser={currentUser}/>}/>
            <Route path="/login" element ={<LoginForm login={login}/>}/>
            <Route path="/signup" element={<SignupForm signup={signup}/>}/>

        </Routes>
       
    )

}

export default ReactRoutes