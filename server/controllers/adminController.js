const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Category = require("../models/Category");
const Budget = require("../models/Budget");


// Get all users
const getUsers = async (req, res) => {

    try {

        const users = await User
            .find()
            .select("-password")
            .sort({ createdAt: -1 });


        res.status(200).json(users);


    } catch (error) {


        res.status(500).json({

            message: "Failed to fetch users",
            error: error.message

        });


    }

};




// Update user role
const updateUserRole = async (req, res) => {

    try {


        const { role } = req.body;


        const user = await User.findByIdAndUpdate(

            req.params.id,

            { role },

            { 
                new: true,
                runValidators: true
            }

        ).select("-password");



        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }



        res.status(200).json(user);



    } catch(error){


        res.status(500).json({

            message:"Failed to update role",
            error:error.message

        });


    }

};




// Delete user
const deleteUser = async (req,res)=>{


    try{


        const user = await User.findByIdAndDelete(
            req.params.id
        );



        if(!user){

            return res.status(404).json({

                message:"User not found"

            });

        }



        res.status(200).json({

            message:"User Deleted Successfully"

        });



    }catch(error){


        res.status(500).json({

            message:"Failed to delete user",
            error:error.message

        });


    }


};






// Admin Dashboard Statistics
const getAdminDashboard = async (req,res)=>{


    try{


        const totalUsers = await User.countDocuments();


        const totalTransactions =
            await Transaction.countDocuments();



        const totalCategories =
            await Category.countDocuments();



        const totalBudgets =
            await Budget.countDocuments();




        const recentUsers = await User
            .find()
            .select("-password")
            .sort({ createdAt:-1 })
            .limit(5)
            .lean();




        res.status(200).json({


            totalUsers,

            totalTransactions,

            totalCategories,

            totalBudgets,

            recentUsers: recentUsers || []


        });



    }catch(error){


        res.status(500).json({

            message:"Failed to load admin dashboard",
            error:error.message

        });


    }


};






module.exports = {


    getUsers,

    updateUserRole,

    deleteUser,

    getAdminDashboard


};