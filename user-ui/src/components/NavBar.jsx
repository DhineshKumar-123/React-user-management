import { Link, useNavigate } from "react-router";

function NavBar()
{
    const navigate = useNavigate()
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-3">
                    <h3>User Management UI </h3><br />
                    <Link to="/user-list" className="btn btn-outline-success me-2">Get Users</Link>
                        <Link to="/add-user" className="btn btn-outline-primary">Add User</Link>
                </div>

            </div>

        </div>
    )
}
export default NavBar;