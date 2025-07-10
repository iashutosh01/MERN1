import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverEndpoint } from "../../config/config";
import { DataGrid } from "@mui/x-data-grid";


function AnalyticsDashboard(){
    const {id}=useParams();
    const navigate=useNavigate();
    const [analyticsData, setAnalyticsData]=useState([]);
    const [fromDate, setFromDate]=useState(null);
    const [toDate, setToDate]=useState(null);


    const fetchAnalytics= async () => {
        try{
            await axios.get(`${serverEndpoint}/links/analytics`,{
                params:{
                    linkId: id,
                    from: fromDate,
                    to: toDate
                },
                withCredentials: true

            });
            setAnalyticsData(responseData);
            console.log(response.data);
        }catch(error){
            console.log(error);
            navigate('/error');
        }
    };

    const columns = [
        {field: 'ip', headerName: 'IP Address', flex:1},
        {field: 'city', headerName: 'IP city', flex:1},        
        {field: 'country', headerName: 'country', flex:1},        
        {field: 'country', headerName: 'country', flex:1},        

    ];
    useEffect(() => {
        fetchAnalytics();

    }, []);



    return (
        <div className="container py-5">
            <h1>Analytics for LinkID:</h1>

            <DataGrid>
                getRowId={(row) => row._id}
                rows
            </DataGrid>

        </div>
    );
}

export default AnalyticsDashboard;