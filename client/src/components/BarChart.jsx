import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function FinanceBarChart({ data }) {

    return (

        <ResponsiveContainer width="100%" height={300}>

            <BarChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar dataKey="income" fill="#00C49F" />

                <Bar dataKey="expense" fill="#FF8042" />

            </BarChart>

        </ResponsiveContainer>

    );

}

export default FinanceBarChart;