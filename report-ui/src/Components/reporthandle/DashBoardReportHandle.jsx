import AverageOccupancy from "./AverageOccupancy";
import ReviewAnalysis from "./HotelReviewAnalysis";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import TopHotelsByRevenue from "./TopHotels";
import TotalBooking from "./TotalBookings";
import TotalCancellations from "./TotalCancellations";
import TotalRefunds from "./TotalRefunds";
import TotalRevenueCard from "./TotalRevenueCard";
import UserAnalysis from "./UserAnalysis";
import './Dashboard.css'

function DashboardReportHandle() {
    return (
        <div>
            <div className="container-fluid">
                <div className="row mb-5">
                    <Navbar  />
                </div> <br />   
                <div className="row">
                    <div className="col-md-4">
                    <h3 className="text-decoration-underline">Revenue and Bookings Analysis</h3>
                    </div>
                    <div className="col-md-8">
                        {/* <h3>Search Bar goes here....</h3> */}
                        {/* <SearchBar /> */}
                    </div>
                    {/* <hr class="border border-primary border-3 opacity-75" /> */}
                </div>
                <div className="row">
                    <div className="col-sm-3" >
                        <TotalRevenueCard />
                    </div>
                    <div className="col-sm-3">
                        <TotalBooking />
                    </div>
                    <div className="col-sm-3">
                        <TotalCancellations />
                    </div>
                    <div className="col-sm-3">
                        <AverageOccupancy />
                    </div>
                </div> <br /><br />
                <div className="row">
                    <div className="row">
                    <h3 className="text-decoration-underline">Review and Customer Analysis</h3>
                    </div>
                    <div className="col-sm-3">
                        <TopHotelsByRevenue />
                    </div>
                    <div className="col-sm-3">
                        <ReviewAnalysis />
                    </div>
                    <div className="col-sm-3">
                        <TotalRefunds/>
                    </div>
                    {/* <div className="col-sm-3">
                        <UserAnalysis />
                    </div> */}
                </div>

            </div>
        </div>
    )
}

export default DashboardReportHandle;