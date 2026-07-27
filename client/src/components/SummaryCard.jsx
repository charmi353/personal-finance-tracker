import {
    FaWallet,
    FaArrowUp,
    FaArrowDown,
    FaList,
    FaChartLine
} from "react-icons/fa";

function SummaryCard({ title, value }) {

    let icon;
    let bgColor;

    switch (title) {

        case "Balance":
            icon = <FaWallet size={28} />;
            bgColor = "from-indigo-500 to-indigo-700";
            break;

        case "Income":
            icon = <FaArrowUp size={28} />;
            bgColor = "from-green-500 to-green-700";
            break;

        case "Expense":
            icon = <FaArrowDown size={28} />;
            bgColor = "from-red-500 to-red-700";
            break;

        case "Transactions":
            icon = <FaList size={28} />;
            bgColor = "from-blue-500 to-blue-700";
            break;

        case "Portfolio Value":
            icon = <FaChartLine size={28} />;
            bgColor = "from-purple-500 to-purple-700";
            break;

        default:
            icon = <FaWallet size={28} />;
            bgColor = "from-gray-500 to-gray-700";
    }

    return (

        <div
            className={`bg-gradient-to-r ${bgColor}
            text-white
            rounded-2xl
            p-6
            flex-1
            min-w-[220px]
            shadow-lg
            hover:shadow-2xl
            hover:-translate-y-1
            transition-all
            duration-300`}
        >

            <div className="flex justify-between items-center">

                <div>

                    <h3 className="text-lg font-medium opacity-90">
                        {title}
                    </h3>

                    <h2 className="text-4xl font-bold mt-4">
                        {value}
                    </h2>

                </div>

                <div className="text-5xl opacity-70">
                    {icon}
                </div>

            </div>

        </div>

    );

}

export default SummaryCard;