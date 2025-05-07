import axios from "axios";
import { setProfile } from "../profileSlice";

const fetchProfile = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    //fetch the data by calling API 
    const resp = await axios.get('http://localhost:8083/api/admin/getadmin', {
        headers: { "Authorization": `Bearer ${token}` }
      })
    //dispatch the data to reducer fetchAlbums() 
    // console.log(resp.data)
    dispatch(setProfile({ profile: resp.data }))
}

export default fetchProfile;