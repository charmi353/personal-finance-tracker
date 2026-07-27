import React from "react";
import "./BudgetCard.css";

const BudgetCard = ({ budget, spent }) => {

    const percentage = budget > 0 
        ? Math.round((spent / budget) * 100)
        : 0;


    const remaining = budget - spent;


    return (

        <div className="budget-card">

            <h2>Monthly Budget</h2>


            <p>
                Budget :
                <b> ₹{budget}</b>
            </p>


            <p>
                Spent :
                <b> ₹{spent}</b>
            </p>


            <p>
                Remaining :
                <b> ₹{remaining > 0 ? remaining : 0}</b>
            </p>



            <div className="progress-container">

                <div
                    className="progress-bar"
                    style={{
                        width:`${percentage}%`
                    }}
                >

                </div>

            </div>



            <h3>
                {percentage}% Used
            </h3>



            {
                percentage >= 100 &&
                <div className="danger">
                    ⚠ Budget Exceeded!
                </div>
            }


            {
                percentage >= 80 && percentage < 100 &&
                <div className="warning">
                    ⚠ Budget limit almost reached
                </div>
            }


        </div>

    );

};


export default BudgetCard;