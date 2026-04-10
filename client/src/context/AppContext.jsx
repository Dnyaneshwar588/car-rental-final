import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { dummyCarData } from "../assets/assets";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const AppContext = createContext();

export const AppProvider = ({ children })=>{

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY

    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [pickupDate, setPickupDate] = useState('')
    const [returnDate, setReturnDate] = useState('')

    const [cars, setCars] = useState([])
    const [isDemoData, setIsDemoData] = useState(false)

    // Function to check if user is logged in
    const fetchUser = async ()=>{
        try {
           const {data} = await axios.get('/api/user/data')
           if (data.success && data.user) {
            setUser(data.user)
            setIsOwner(data.user.role === 'owner')
           }else{
            // Clear stale/invalid token
            localStorage.removeItem('token')
            setToken(null)
            setUser(null)
            setIsOwner(false)
            axios.defaults.headers.common['Authorization'] = ''
           }
        } catch (error) {
            // Clear token on network/auth errors
            localStorage.removeItem('token')
            setToken(null)
            setUser(null)
            setIsOwner(false)
            axios.defaults.headers.common['Authorization'] = ''
        }
    }
    // Function to fetch all cars from the server
    const fetchCars = async () =>{
        try {
            // If user is logged in, fetch from protected endpoint
            if (token) {
                const {data} = await axios.get('/api/owner/available-cars')
                if (data.success && data.cars.length > 0) {
                    setCars(data.cars)
                    setIsDemoData(false)
                } else {
                    setCars(dummyCarData)
                    setIsDemoData(true)
                    if (!data.success) {
                        toast.error(data.message)
                    }
                }
            } else {
                // For non-logged-in users, use dummy data
                setCars(dummyCarData)
                setIsDemoData(true)
            }
        } catch (error) {
            setCars(dummyCarData)
            setIsDemoData(true)
            toast.error(error.message)
        }
    }

    // Function to log out the user
    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['Authorization'] = ''
        toast.success('You have been logged out')
    }


    // useEffect to retrieve the token from localStorage
    useEffect(()=>{
        const token = localStorage.getItem('token')
        setToken(token)
        fetchCars()
    },[])

    // useEffect to fetch user data when token is available
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization'] = `${token}`
            fetchUser()
        }
    },[token])

    const value = {
        navigate, currency, axios, user, setUser,
        token, setToken, isOwner, setIsOwner, fetchUser, showLogin, setShowLogin, logout, fetchCars, cars, setCars, 
        pickupDate, setPickupDate, returnDate, setReturnDate, isDemoData
    }

    return (
    <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}