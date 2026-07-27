import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FinancePieChart from "../components/PieChart";
function Portfolio() {

    const [portfolios, setPortfolios] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    const [assetName, setAssetName] = useState("");
    const [assetType, setAssetType] = useState("");
    const [value, setValue] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchPortfolios();
    }, []);



    const fetchPortfolios = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await api.get("/portfolios", {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });


            setPortfolios(response.data);


            const total = response.data.reduce(
                (sum,item)=> sum + Number(item.value),
                0
            );


            setTotalValue(total);


        } catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    };



    const addPortfolio = async()=>{


        try{

            const token = localStorage.getItem("token");


            if(editingId){


                await api.put(
                    `/portfolios/${editingId}`,
                    {
                        assetName,
                        assetType,
                        value
                    },
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );


                alert("Asset Updated Successfully");


            }
            else{


                await api.post(
                    "/portfolios",
                    {
                        assetName,
                        assetType,
                        value
                    },
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );


                alert("Asset Added Successfully");


            }


            setAssetName("");
            setAssetType("");
            setValue("");
            setEditingId(null);


            fetchPortfolios();


        }
        catch(error){

            console.log(error);

        }

    };




    const deletePortfolio = async(id)=>{


        try{

            const token = localStorage.getItem("token");


            await api.delete(
                `/portfolios/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            alert("Asset Deleted Successfully");


            fetchPortfolios();


        }
        catch(error){

            console.log(error);

        }


    };




    const editPortfolio=(item)=>{


        setEditingId(item._id);

        setAssetName(item.assetName);

        setAssetType(item.assetType);

        setValue(item.value);


    };





    return (

        <>

<style>

{`

.portfolio-page{

    padding:30px;

    background:#f8fafc;

    min-height:100vh;

    flex:1;

}
.portfolio-summary{

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:25px;

    margin-bottom:30px;

}



.chart-card{

    background:white;

    padding:20px;

    border-radius:18px;

    box-shadow:0 10px 20px rgba(0,0,0,.08);

}



.portfolio-title{

    font-size:36px;

    font-weight:800;

    color:#111827;

    margin-bottom:25px;

}



/* Total Value Card */

.total-card{

    background:linear-gradient(
        135deg,
        #059669,
        #10b981
    );

    color:white;

    padding:30px;

    border-radius:22px;

    width:320px;

    margin-bottom:30px;

    box-shadow:
    0 15px 30px rgba(16,185,129,0.25);

}



.total-card h3{

    font-size:18px;

    opacity:0.9;

}



.total-card h1{

    font-size:35px;

    margin-top:10px;

}



/* Form */

.form-card{

    background:white;

    padding:30px;

    border-radius:20px;

    margin-bottom:35px;

    box-shadow:
    0 10px 25px rgba(0,0,0,0.06);

}



.form-card h2{

    margin-bottom:20px;

    color:#1f2937;

}



.form-card input{

    padding:14px;

    width:220px;

    margin-right:15px;

    border-radius:12px;

    border:1px solid #e5e7eb;

    outline:none;

    font-size:15px;

    transition:.3s;

}



.form-card input:focus{

    border-color:#2563eb;

    box-shadow:
    0 0 0 3px rgba(37,99,235,.15);

}



/* Main Button */

.add-btn{

    margin-top:15px;

    padding:13px 30px;

    border:none;

    border-radius:12px;

    background:#2563eb;

    color:white;

    font-weight:600;

    cursor:pointer;

    transition:.3s;

}



.add-btn:hover{

    background:#1d4ed8;

    transform:translateY(-2px);

}



/* Asset Cards */

.cards-container{

    display:grid;

    grid-template-columns:
    repeat(auto-fit,minmax(280px,1fr));

    gap:25px;

}



.asset-card{

    background:white;

    padding:25px;

    border-radius:20px;

    box-shadow:
    0 10px 25px rgba(0,0,0,.06);

    transition:.3s;

    border:1px solid #f1f5f9;

}



.asset-card:hover{

    transform:translateY(-8px);

    box-shadow:
    0 15px 35px rgba(0,0,0,.12);

}



.asset-card h2{

    color:#111827;

    margin-bottom:12px;

}



/* Asset Type */

.badge{

    background:#eff6ff;

    color:#2563eb;

    padding:7px 14px;

    border-radius:30px;

    font-size:14px;

    font-weight:600;

}



/* Money */

.value{

    font-size:28px;

    font-weight:800;

    color:#059669;

    margin:20px 0;

}



/* Buttons */

.edit-btn,
.delete-btn{

    padding:10px 18px;

    border:none;

    border-radius:10px;

    cursor:pointer;

    font-weight:600;

}



.edit-btn{

    background:#fbbf24;

    color:#78350f;

}



.edit-btn:hover{

    background:#f59e0b;

}



.delete-btn{

    background:#ef4444;

    color:white;

    margin-left:10px;

}



.delete-btn:hover{

    background:#dc2626;

}



/* Empty */

.empty{

    background:white;

    padding:40px;

    border-radius:20px;

    text-align:center;

    box-shadow:
    0 10px 25px rgba(0,0,0,.05);

}



/* Responsive */
.portfolio-layout{

    display:flex;
    min-height:100vh;

@media(max-width:768px){


    .portfolio-page{
         flex:1;
    background:#f8fafc;
    min-height:100vh;

    margin-left:250px;   
    margin-top:70px;     

    padding:30px;
       
    }


    .total-card{

        width:auto;

    }


    .form-card input{

        width:100%;

        margin-bottom:15px;

    }
    

}


    .add-btn{

        width:100%;

    }


}

`

}

</style>
        



        <Navbar/>


       <div className="portfolio-layout">


            <Sidebar/>


            <div className="portfolio-page">


                <h1 className="portfolio-title">
                    My Portfolio
                </h1>
                <div className="portfolio-summary">

    <div className="total-card">

        <h3>Total Portfolio Value</h3>

        <h1>₹{totalValue}</h1>

    </div>

    <div className="chart-card">

        <FinancePieChart data={portfolios} />

    </div>

</div>





                <div className="form-card">


                    <h2>

                    {editingId ? 
                    "Update Asset" : 
                    "Add New Asset"}

                    </h2>



                    <input
                    type="text"
                    placeholder="Asset Name"
                    value={assetName}
                    onChange={(e)=>setAssetName(e.target.value)}
                    />



                    <input
                    type="text"
                    placeholder="Asset Type"
                    value={assetType}
                    onChange={(e)=>setAssetType(e.target.value)}
                    />



                    <input
                    type="number"
                    placeholder="Value"
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    />



                    <br/>


                    <button 
                    className="add-btn"
                    onClick={addPortfolio}
                    >

                    {editingId ? 
                    "Update Asset" : 
                    "Add Asset"}

                    </button>


                </div>






                {

                loading ? 

                <h3>
                    Loading Portfolio...
                </h3>


                :

                portfolios.length > 0 ?


                <div className="cards-container">


                {

                portfolios.map((item)=>(


                    <div 
                    className="asset-card"
                    key={item._id}
                    >


                        <h2>
                            {item.assetName}
                        </h2>



                        <span className="badge">
                            {item.assetType}
                        </span>



                        <p className="value">

                            ₹{item.value}

                        </p>




                        <button
                        className="edit-btn"
                        onClick={()=>editPortfolio(item)}
                        >

                        Edit

                        </button>



                        <button
                        className="delete-btn"
                        onClick={()=>deletePortfolio(item._id)}
                        >

                        Delete

                        </button>



                    </div>


                ))

                }


                </div>



                :


                <div className="empty">

                    <h2>
                        No Assets Found
                    </h2>

                    <p>
                        Start adding your investments to track your portfolio.
                    </p>

                </div>


                }


            </div>


        </div>


        </>

    );

}


export default Portfolio;