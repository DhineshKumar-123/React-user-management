import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";


function UserList() {
    const [userlist, setUserList] = useState([]);

    useEffect(() => {
        const getUserList = async () => {
            try {
                const response = await axios.get('http://jsonplaceholder.typicode.com/users');
                setUserList(response.data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        getUserList();
    }, []);
    const deleteUser = (uid) =>{
        try{
            const resp = axios.delete(`https://jsonplaceholder.typicode.com/users/${uid}`);
        let temp = [...userlist]
        temp = temp.filter(u=>u.id!==uid)
        setUserList(temp);
        alert("User with id: "+ uid +" has been deleted")
        }
        catch(err)
        {
            console.log(err+"Can't Delete the User!!!!!")
        }

    }

    return (
        <div className="container mt-4">
            <div className="row">
                <NavBar />
            </div>
            <h1>List of Users</h1>
            <table className="table table-bordered table-striped mt-4">
                <thead >
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userlist.map((u,index) => (
                            <tr key={index}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>{u.company.name}</td>
                                <td><button className="btn btn-danger" onClick={()=>deleteUser(u.id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
