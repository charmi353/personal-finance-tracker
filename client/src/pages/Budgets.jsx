import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


function Budgets() {


    const [budget,setBudget] = useState({

        id:"",
        month:"",
        amount:0,
        totalExpense:0,
        remaining:0,
        status:"Safe"

    });



    useEffect(()=>{

        fetchBudget();

    },[]);




    const fetchBudget = async()=>{


        try{


            const res = await api.get("/budgets");


            console.log("BUDGET DATA:",res.data);



            if(res.data.length > 0){


                const data = res.data[0];


                setBudget({

                    id:data._id,

                    month:
                    `${data.year}-${String(data.month).padStart(2,"0")}`,

                    amount:data.amount,

                    totalExpense:data.totalExpense || 0,

                    remaining:data.remaining || data.amount,

                    status:data.status || "Safe"

                });


            }



        }catch(error){


            console.log(error);


        }


    };






    const handleChange=(e)=>{


        setBudget({

            ...budget,

            [e.target.name]:e.target.value

        });


    };







    const handleSubmit=async(e)=>{


        e.preventDefault();


        try{


            const [year,month] =
            budget.month.split("-");



            await api.post(

                "/budgets",

                {

                    month:Number(month),

                    year:Number(year),

                    amount:Number(budget.amount)

                }

            );



            alert("Budget Saved Successfully");


            fetchBudget();



        }catch(error){


            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );


        }


    };






    const usage =
    budget.amount > 0

    ?

    Math.min(
        (budget.totalExpense / budget.amount) * 100,
        100
    )

    :

    0;






    return(


<>


<Navbar/>


<div className="flex bg-slate-100 min-h-screen">


<Sidebar/>


<div className="flex-1 p-8">



<h1 className="text-4xl font-bold text-slate-800">

Budget Planner

</h1>



<p className="text-gray-500 mt-2 mb-8">

Manage your monthly spending limits.

</p>





<div className="grid lg:grid-cols-2 gap-8">





<div className="bg-white rounded-2xl shadow-lg p-8">


<h2 className="text-2xl font-bold mb-6">

Create Budget

</h2>



<form
onSubmit={handleSubmit}
className="space-y-5"
>



<input

type="month"

name="month"

value={budget.month}

onChange={handleChange}

className="w-full border rounded-xl px-4 py-3"

/>




<input

type="number"

name="amount"

value={budget.amount}

onChange={handleChange}

placeholder="Budget Amount"

className="w-full border rounded-xl px-4 py-3"

/>





<button

className="w-full bg-blue-600 text-white py-3 rounded-xl"

>

Save Budget

</button>



</form>


</div>







<div className="bg-white rounded-2xl shadow-lg p-8">



<h2 className="text-2xl font-bold mb-6">

Current Budget

</h2>




<p className="text-gray-500">

Month

</p>

<h2 className="text-2xl font-bold">

{budget.month || "--"}

</h2>





<p className="text-gray-500 mt-5">

Budget Amount

</p>

<h1 className="text-5xl font-bold text-blue-600">

₹{budget.amount}

</h1>






<div className="mt-5 bg-red-50 p-4 rounded-xl">

<p>

Expenses

</p>

<h2 className="text-2xl font-bold text-red-600">

₹{budget.totalExpense}

</h2>


</div>





<div className="mt-5 bg-green-50 p-4 rounded-xl">

<p>

Remaining

</p>

<h2 className="text-2xl font-bold text-green-600">

₹{budget.remaining}

</h2>


</div>






<div className="mt-5 p-4 rounded-xl text-center font-bold">


{
budget.status==="Safe"

?

"🟢 Budget Healthy"

:

budget.status==="Warning"

?

"🟡 Near Limit"

:

"🔴 Budget Exceeded"

}


</div>







<div className="mt-5">


<p className="mb-2">

Usage {usage.toFixed(0)}%

</p>



<div className="h-4 bg-gray-200 rounded-full">


<div

className={`h-4 rounded-full ${
budget.status==="Safe"
?"bg-green-500"
:
budget.status==="Warning"
?"bg-yellow-500"
:
"bg-red-500"
}`}

style={{

width:`${usage}%`

}}

/>


</div>


</div>




</div>






</div>



</div>


</div>


</>


);


}


export default Budgets;