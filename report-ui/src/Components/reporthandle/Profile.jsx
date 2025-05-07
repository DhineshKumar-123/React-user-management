import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import animationData from "../../assets/profile-animation.json"; 
import fetchProfile from "../../store/actions/profileAction";
import axios from "axios";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux profile state commmintg from teh store
    const profileData = useSelector((state) => state.profile.profile);///SLECTOR
    // console.log(profileData)

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: ""
    });

    useEffect(() => {
        dispatch(fetchProfile()); // Fetch profile via Redux
    }, [dispatch]);

    useEffect(() => {
        if (profileData) {
            setFormData({
                name: profileData.name || "",
                email: profileData.email || "",
                contact: profileData.contact ? profileData.contact.toString() : ""
            });
        }
    }, [profileData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.put("http://localhost:8083/api/admin/profile/update", {
                ...formData,
                contact: formData.contact ? Number(formData.contact) : null
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Refresh profile after update
            dispatch(fetchProfile());
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row my-4">
                <div className="col text-start ps-4">
                    <button className="btn btn-primary" onClick={() => navigate("/report-dashboard")}>
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-sm-3 text-center">
                    <Lottie animationData={animationData} loop={true} style={{ height: 400 }} />
                </div>

                <div className="col-sm-5">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white position-relative">
                            <h5 className="mb-0 text-center" style={{color:"white"}}>User Profile</h5>
                            <small className="d-block text-center" style={{color:"white"}}>Welcome, {profileData?.name}</small>
                            <button
                                className="btn btn-sm btn-light position-absolute top-0 end-0 m-2"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? "Cancel" : "Edit"}
                            </button>
                        </div>
                        <div className="card-body">
                            {isEditing ? (
                                <>
                                    <div className="row mb-2">
                                        <div className="col-5 font-weight-bold">Name:</div>
                                        <div className="col-7">
                                            <input name="name" className="form-control" value={formData.name} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-5 font-weight-bold">Email:</div>
                                        <div className="col-7">
                                            <input name="email" className="form-control" value={formData.email} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-5 font-weight-bold">Contact:</div>
                                        <div className="col-7">
                                            <input name="contact" type="text" className="form-control" value={formData.contact} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <button className="btn btn-success" onClick={handleSave}>Save</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="row mb-2">
                                        <div className="col-5 font-weight-bold">Name:</div>
                                        <div className="col-7">{profileData?.name || "N/A"}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-5 font-weight-bold">Email:</div>
                                        <div className="col-7">{profileData?.email || "N/A"}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-5 font-weight-bold">Contact:</div>
                                        <div className="col-7">{profileData?.contact || "N/A"}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-5 font-weight-bold">Last Logging:</div>
                                        <div className="col-7">{profileData?.last_Log || "N/A"}</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
