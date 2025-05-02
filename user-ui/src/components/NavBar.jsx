import { useNavigate } from "react-router";

function NavBar()
{
    const navigate = useNavigate()
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-3">
                    <h3>User Management UI </h3><br />
                    <button onClick={()=>navigate("/user-list")} className="btn btn-primary me-2">Show Users</button>
                    <button onClick={()=>navigate("/add-user")} className="btn btn-success">Add Users</button>
                </div>

            </div>

        </div>
    )
}
export default NavBar;