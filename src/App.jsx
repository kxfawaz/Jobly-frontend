import { useState, useEffect } from 'react'
// React hooks: useState for state variables, useEffect for running code on lifecycle changes.

import './App.css' 
// Global CSS styles for the app.

import NavBar from './NavBar' 
// Navigation bar component.

import ReactRoutes from './ReactRoutes' 
// Component that contains all app routes.

import JoblyApi from './api' 
// Central API helper for backend requests.

import axios from 'axios' 
// HTTP client (not directly used in this file, but imported here).

import { jwtDecode } from "jwt-decode";
// Library to decode JWT tokens so we can extract username.

import useLocalStorage from './useLocalStorage'
// Custom hook that syncs a piece of state with localStorage (for token persistence).

function App() {

  // State for list of companies
  const [companies, setCompanies] = useState([])

  // State for list of jobs
  const [jobs, setJobs] = useState([])

  // Token persisted in localStorage — null if not logged in
  const [token, setToken] = useLocalStorage('jobly-token', null)

  // Currently logged-in user object
  const [currentUser, setCurrentUser] = useState(null)
  

  async function handleApply(jobId){
    await JoblyApi.applyJob(currentUser.username, jobId)
    setCurrentUser(u=>({
      ...u,
      applications: [...u.applications,jobId]
    }))
  }


  // Load companies once on mount
  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies()
      setCompanies(companies)
    }
    getCompanies();
  }, [])

  // Load jobs once on mount
  useEffect(() => {
    async function getJobs() {
      let jobs = await JoblyApi.getAllJobs()
      setJobs(jobs)
    }
    getJobs();
  }, [])


  // Log in: call API, get token, store in state + localStorage
  async function login(formData) {   
    console.log("App.login called with", formData); 
    const t = await JoblyApi.login(formData)
    setToken(t)
  }

  // Sign up: call API, get token, store in state + localStorage
  async function signup(formData) {   
    const t = await JoblyApi.signup(formData)
    setToken(t)
  }

  // Log out: clear token (from state + localStorage) and current user
  function logout() {
    setToken(null)
    setCurrentUser(null)
    JoblyApi.token = null
  }


  // Whenever token changes, load current user
  useEffect(() => {
    if (!token) return; // If no token, skip.

    console.log("token set:", token.slice(0, 20) + "...");

    // Set API helper's token so requests are authenticated
    JoblyApi.token = token;

    // Decode username from JWT
    const { username } = jwtDecode(token);
    console.log("decoded username:", username);

    // Fetch user info from API
    async function getUser() {
      try {
        const resp = await JoblyApi.request(`users/${username}`);
        console.log("getUser resp:", resp);
        setCurrentUser(resp.user);
      } catch (err) {
        console.error("getUser failed:", err);
      }
    }
    getUser();
  }, [token])
  // Runs whenever token changes (login, signup, or logout)


  return (
    <>
      {/* Navigation bar, shows links depending on login status */}
      <NavBar currentUser={currentUser} logout={logout} />

      {/* Main app routes, passing companies, jobs, and auth functions */}
      <ReactRoutes 
        companies={companies} 
        jobs={jobs} 
        login={login} 
        signup={signup} 
        currentUser={currentUser}
        handleApply={handleApply}
        applications ={currentUser ? currentUser.applications : []}  // make sure its an empty array if we havent gotten currentUser yet 
      />
    </>
  )
}

export default App
// Export App so it can be rendered in index.js