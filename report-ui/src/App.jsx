import { Route, Routes } from 'react-router'
import Login from './Components/auth/Login'
import DashboardReportHandle from './Components/reporthandle/DashBoardReportHandle'
import RevenueDetails from './Components/reporthandle/RevenueDetails'
import Profile from './Components/reporthandle/Profile'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import fetchProfile from './store/actions/profileAction'
import BookingDetails from './Components/reporthandle/BookingDetails'
import CustomerDashBoard from './Components/reporthandle/CustomerDashBoard'
import ReviewDetails from './Components/reporthandle/ReviewsDetails'
import CancellationDetails from './Components/reporthandle/CancellationDetails'
import AddDiscount from './Components/reporthandle/AddDiscounts'
import RefundDetails from './Components/reporthandle/RefundDetails'



function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])
  return (
   <div>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='profile' element={<Profile />}></Route>
        <Route path="report-dashboard" element={<DashboardReportHandle />}></Route>
        <Route path='detail-revenue' element={<RevenueDetails/>}></Route>
        <Route path='detail-bookings' element={<BookingDetails/>}></Route>
        <Route path='customer-dashboard' element={<CustomerDashBoard />}></Route>
        <Route path='detail-reviews' element={<ReviewDetails />}></Route>
        <Route path='detail-cancellations' element={<CancellationDetails />}></Route>
        <Route path='add-discount' element={<AddDiscount />}></Route>
        <Route path='detail-refunds' element={<RefundDetails />}></Route>
      </Routes>
   </div>
  )
}

export default App
