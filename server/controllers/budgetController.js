const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");

const logActivity = require("../utils/logActivity");



// Create Budget

const createBudget = async (req, res) => {

    try {


        const { month, year, amount } = req.body;



        const existingBudget = await Budget.findOne({

            user: req.user.id,

            month,

            year

        });



        if(existingBudget){

            return res.status(400).json({

                message:"Budget already exists for this month"

            });

        }




        const budget = await Budget.create({

            user:req.user.id,

            month,

            year,

            amount

        });




        await logActivity(

            req.user.id,

            "Budget",

            `Created budget for ${month}/${year}`

        );




        res.status(201).json({

            message:"Budget Created Successfully",

            budget

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// Get Budgets

const getBudgets = async(req,res)=>{


    try{


        const budgets = await Budget.find({

            user:req.user.id

        });




        const budgetData = [];




        for(const budget of budgets){



            const expenses =
            await Transaction.find({

                user:req.user.id,

                type:"expense",


                month:budget.month,

                year:budget.year


            });




            let totalExpense = 0;



            expenses.forEach((item)=>{


                totalExpense += item.amount;


            });





            const remaining =
            budget.amount - totalExpense;



            let status="Safe";



            if(totalExpense >= budget.amount){


                status="Exceeded";


            }
            else if(totalExpense >= budget.amount * 0.8){


                status="Warning";


            }





            budgetData.push({


                ...budget.toObject(),


                totalExpense,

                remaining,

                status


            });



        }




        res.status(200).json(budgetData);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// Update Budget

const updateBudget = async(req,res)=>{


    try{


        const budget =
        await Budget.findById(req.params.id);




        if(!budget){


            return res.status(404).json({

                message:"Budget not found"

            });


        }





        if(budget.user.toString() !== req.user.id){


            return res.status(401).json({

                message:"Not Authorized"

            });


        }





        const updatedBudget =
        await Budget.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );





        await logActivity(

            req.user.id,

            "Budget",

            "Updated budget"

        );





        res.status(200).json({

            message:"Budget Updated Successfully",

            updatedBudget

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};








// Delete Budget

const deleteBudget = async(req,res)=>{


    try{


        const budget =
        await Budget.findById(req.params.id);




        if(!budget){


            return res.status(404).json({

                message:"Budget not found"

            });


        }





        if(budget.user.toString() !== req.user.id){


            return res.status(401).json({

                message:"Not Authorized"

            });


        }





        await Budget.findByIdAndDelete(
            req.params.id
        );





        await logActivity(

            req.user.id,

            "Budget",

            "Deleted budget"

        );





        res.status(200).json({

            message:"Budget Deleted Successfully"

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};






module.exports={

    createBudget,

    getBudgets,

    updateBudget,

    deleteBudget

};