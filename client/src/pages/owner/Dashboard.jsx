import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const {axios, isOwner, currency, user} = useAppContext()
  const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'dnyaneshwarkhune723@gmail.com').toLowerCase()
  const isAdmin = user?.email?.toLowerCase() === adminEmail
  const [accessRequests, setAccessRequests] = useState([])

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })
  const [loadingRequestId, setLoadingRequestId] = useState(null)
  const [grantedRequestIds, setGrantedRequestIds] = useState(new Set())

  const dashboardCards = [
    {title: "Total Cars", value: data.totalCars, icon: assets.carIconColored},
    {title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored},
    {title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored},
    {title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored},
  ]

  const fetchDashboardData = async ()=>{
    try {
       const { data } = await axios.get('/api/owner/dashboard')
       if (data.success){
        setData(data.dashboardData)
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchAccessRequests = async () => {
    try {
      const { data } = await axios.get('/api/owner/access-requests')
      if (data.success) {
        setAccessRequests(data.requests || [])
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleGrantOwnerAccess = async (requestId) => {
    try {
      setLoadingRequestId(requestId)
      const { data } = await axios.post('/api/owner/grant-owner-access', { requestId })
      if (data.success) {
        toast.success(data.message)
        setGrantedRequestIds(prev => new Set([...prev, requestId]))
        setTimeout(() => {
          fetchAccessRequests()
          setGrantedRequestIds(new Set())
        }, 600)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoadingRequestId(null)
    }
  }

  useEffect(()=>{
    if(isOwner){
      fetchDashboardData()
      if (isAdmin) {
        fetchAccessRequests()
      }
    }
  },[isOwner, isAdmin])

  return (
    <div className='px-4 pt-10 md:px-10 flex-1'>
      <Title title="Admin Dashboard" subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"/>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl'>
        {dashboardCards.map((card, index)=>(
          <div key={index} className='flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor'>
            <div>
              <h1 className='text-xs text-gray-500'>{card.title}</h1>
              <p className='text-lg font-semibold'>{card.value}</p>
            </div>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-primary/10'>
              <img src={card.icon} alt="" className='h-4 w-4'/>
            </div>
          </div>
        ))}
      </div>


      <div className='flex flex-wrap items-start gap-6 mb-8 w-full'>
        {/* recent booking  */}
        <div className='p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full'>
          <h1 className='text-lg font-medium'>Recent Bookings</h1>
          <p className='text-gray-500'>Latest customer bookings</p>
          {data.recentBookings.map((booking, index)=>(
            <div key={index} className='mt-4 flex items-center justify-between'>

              <div className='flex items-center gap-2'>
                <div className='hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10'>
                  <img src={assets.listIconColored} alt="" className='h-5 w-5'/>
                </div>
                <div>
                  <p>{booking.car.brand} {booking.car.model}</p>
                  <p className='text-sm text-gray-500'>{booking.createdAt.split('T')[0]}</p>
                </div>
              </div>

              <div className='flex items-center gap-2 font-medium'>
                <p className='text-sm text-gray-500'>{currency}{booking.price}</p>
                <p className='px-3 py-0.5 border border-borderColor rounded-full text-sm'>{booking.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* monthly revenue */}
        <div className='p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs'>
          <h1 className='text-lg font-medium'>Monthly Revenue</h1>
          <p className='text-gray-500'>Revenue for current month</p>
          <p className='text-3xl mt-6 font-semibold text-primary'>{currency}{data.monthlyRevenue}</p>
        </div>

        {isAdmin && (
          <div className='p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full'>
            <h1 className='text-lg font-medium'>Owner Access Requests</h1>
            <p className='text-gray-500'>Review customer requests and grant owner access</p>

            {accessRequests.length === 0 ? (
              <p className='text-sm text-gray-500 mt-4'>No pending requests.</p>
            ) : (
              <div className='mt-4 overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='text-left text-gray-500 border-b border-borderColor'>
                      <th className='py-2 pr-3 font-medium'>Name</th>
                      <th className='py-2 pr-3 font-medium'>Email</th>
                      <th className='py-2 pr-3 font-medium'>Requested On</th>
                      <th className='py-2 font-medium'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accessRequests.map((request) => (
                      <tr key={request._id} className='border-b border-borderColor/70'>
                        <td className='py-3 pr-3'>{request.user?.name || 'User'}</td>
                        <td className='py-3 pr-3'>{request.email}</td>
                        <td className='py-3 pr-3'>{new Date(request.createdAt).toLocaleDateString()}</td>
                        <td className='py-3'>
                          <button
                            onClick={() => handleGrantOwnerAccess(request._id)}
                            disabled={loadingRequestId === request._id || grantedRequestIds.has(request._id)}
                            className={`px-3 py-1.5 rounded-md cursor-pointer transition-all duration-500 font-medium flex items-center gap-2 ${
                              grantedRequestIds.has(request._id)
                                ? 'bg-green-100 text-green-600'
                                : loadingRequestId === request._id
                                ? 'bg-blue-100 text-blue-600 opacity-75'
                                : 'bg-primary hover:bg-primary-dull text-white'
                            } ${(loadingRequestId === request._id || grantedRequestIds.has(request._id)) ? 'opacity-90' : ''}`}
                          >
                            {loadingRequestId === request._id ? (
                              <>
                                <span className='inline-block animate-spin'>⏳</span>
                                <span className='text-blue-600'>Processing...</span>
                              </>
                            ) : grantedRequestIds.has(request._id) ? (
                              <>
                                <span>✓</span>
                                <span className='text-green-600'>Granted</span>
                              </>
                            ) : (
                              <span className='text-white'>Grant</span>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        
      </div>


    </div>
  )
}

export default Dashboard
