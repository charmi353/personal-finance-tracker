import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

function FinancePieChart({ income, expense }) {

    const data = [
        {
            name: "Income",
            value: income
        },
        {
            name: "Expense",
            value: expense
        }
    ];

    const COLORS = ["#00C49F", "#FF8042"];

    return (
        <div
    style={{
        display: "flex",
        justifyContent: "center"
    }}
>
        <PieChart width={400} height={300}>

            <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
            >

                {data.map((entry, index) => (

                    <Cell
                        key={index}
                        fill={COLORS[index]}
                    />

                ))}

            </Pie>

            <Tooltip />

            <Legend />

        </PieChart>
 
</div>
    );
}

export default FinancePieChart;