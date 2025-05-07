import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import { useNavigate } from "react-router";

function RefundDetails()
{
    const[listofrefund,setListofRefund] = useState([]);
    const navigate = useNavigate()



    useEffect(()=>{
        const getListofRefund = async()=>{
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:8083/api/refund/getall",{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            // setListofRefund(response.data);
            console.log(response.data)
            setListofRefund(response.data)
            // console.log(setListofRefund)
        }
        getListofRefund();
    },[])
    return(
        <div className="container-fluid">
              <div className="row"><Navbar /></div><br /><br /><br />
            <div className="row">
                <div>
                    <h3>Refund Details </h3>
                </div><br /><br />
                <div className="col-sm-2">
                        <button className="btn btn-primary" onClick={() => navigate('/report-dashboard')}>Back</button>
                </div>
                <div className="col-sm-8">
                    <table className="table table-bordered table-striped bg-white">
                        <thead className="table-dark ">
                            <tr>
                                <td>S.No</td>
                                <td>Refund Amount</td>
                                <td>Refund Date</td>
                                <td>Booking Date</td>
                                <td>Booking ID</td>
                                <td>Cancellation ID</td>
                                <td>Reason of Cancellation</td>
                                <td>Details</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            listofrefund.map((list,index)=>(
                                <tr key={index}>
                                    <td>{list.id}</td>
                                    <td>{list.amountRefunded}</td>
                                    <td>{list.processedDate.split("T")[0]}</td>
                                    <td>{list.cancellationRequest.booking.bookedAt.split("T")[0]}</td>
                                    <td>{list.cancellationRequest.booking.id}</td>
                                    <td>{list.cancellationRequest.id}</td>
                                    <td>{list.cancellationRequest.details}</td>
                                    <td>{list.cancellationRequest.reason}</td>
                                    <td>{list.refundStatus}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
export default RefundDetails