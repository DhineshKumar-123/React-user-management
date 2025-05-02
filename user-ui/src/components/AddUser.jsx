import { useEffect, useState } from "react";
import NavBar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router";

function AddUser() {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const navigate = useNavigate();

    let body = {
        "name": name,
        "email": email,
        "phone": phone,
        "company": {
            "name": companyName
        },
    };

    const registerUser = async ($event) => {
        $event.preventDefault(); 
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', body);
            console.log("User added successfully!!!");
            alert("User Added Optimistically!!!!!!!");
            console.log(body);
            navigate("/user-list");
        } catch (err) {
            console.log(err);
            alert(err + " Unauthorized");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <NavBar />
            </div><br /><br /><br />
            <div className="row">
                <div className="col-sm-4">
                    <p>Col-1 Goes Hereee .............</p>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-header">
                            <p>Add User Details</p>
                        </div>
                        <div className="card-body">
                            <form onSubmit={registerUser}>
                                <div className="mb-3">
                                    <label className="form-label">UserName </label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="username" required
                                        onChange={($event) => { setName($event.target.value) }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Email </label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required
                                        onChange={($event) => { setEmail($event.target.value) }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone </label>
                                    <input type="tel" className="form-control" id="exampleFormControlInput1" placeholder="mobile" required
                                        onChange={($event) => { setPhone($event.target.value) }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">CompanyName </label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" required
                                        onChange={($event) => { setCompanyName($event.target.value) }} />
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary" type="submit">Submit</button> 
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <p>Col-3 Goes Here ................</p>
                </div>
            </div>
        </div>
    );
}

export default AddUser;
