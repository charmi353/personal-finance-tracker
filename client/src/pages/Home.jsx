import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaChartPie,
  FaShieldAlt,
  FaMoneyBillWave,
  FaBell,
  FaChartLine,
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-100 min-h-screen">

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
          <h1 className="text-3xl font-bold text-blue-700">
            Finance Tracker
          </h1>

          <div className="space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-6xl font-bold text-slate-800 leading-tight">
            Manage Your Personal Finance Easily
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Track your income, expenses, budgets, portfolios, and financial
            reports in one secure platform.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white"
            >
              Login
            </button>
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900"
            alt="Finance"
            className="rounded-3xl shadow-xl"
          />
        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-8 py-16">

        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <FaMoneyBillWave className="text-5xl text-green-600 mx-auto mb-5" />
            <h3 className="text-2xl font-bold">
              Income & Expenses
            </h3>
            <p className="mt-3 text-gray-600">
              Record every income and expense quickly.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <FaWallet className="text-5xl text-blue-600 mx-auto mb-5" />
            <h3 className="text-2xl font-bold">
              Budget Planning
            </h3>
            <p className="mt-3 text-gray-600">
              Create monthly budgets and receive alerts.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <FaChartPie className="text-5xl text-purple-600 mx-auto mb-5" />
            <h3 className="text-2xl font-bold">
              Analytics
            </h3>
            <p className="mt-3 text-gray-600">
              Beautiful charts and financial reports.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <FaChartLine className="text-5xl text-red-600 mx-auto mb-5" />
            <h3 className="text-2xl font-bold">
              Portfolio
            </h3>
            <p className="mt-3 text-gray-600">
              Manage investments and assets.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <FaBell className="text-5xl text-yellow-500 mx-auto mb-5" />
            <h3 className="text-2xl font-bold">
              Notifications
            </h3>
            <p className="mt-3 text-gray-600">
              Receive real-time budget alerts using Socket.io.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <FaShieldAlt className="text-5xl text-indigo-600 mx-auto mb-5" />
            <h3 className="text-2xl font-bold">
              Secure
            </h3>
            <p className="mt-3 text-gray-600">
              JWT Authentication with role-based access.
            </p>
          </div>

        </div>

      </section>
      <section className="bg-white py-20">
    <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-12">
            About Finance Tracker
        </h2>

        <p className="text-center text-gray-600 text-lg max-w-4xl mx-auto leading-8">
            Finance Tracker is a secure personal finance management platform
            that helps users track income, expenses, monthly budgets,
            investments, and financial reports in one place. The system
            includes role-based access for Users, Moderators, and Admins,
            ensuring secure and efficient financial management.
        </p>

    </div>
</section>
<section className="bg-blue-600 py-20 text-white">

    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-center">

        <div>
            <h1 className="text-5xl font-bold">1000+</h1>
            <p className="mt-3">Users</p>
        </div>

        <div>
            <h1 className="text-5xl font-bold">₹10M+</h1>
            <p className="mt-3">Transactions</p>
        </div>

        <div>
            <h1 className="text-5xl font-bold">99%</h1>
            <p className="mt-3">Secure</p>
        </div>

        <div>
            <h1 className="text-5xl font-bold">24/7</h1>
            <p className="mt-3">Support</p>
        </div>

    </div>

</section>
<section className="py-20 bg-slate-100">

    <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">
                    Secure Platform
                </h3>

                <p className="text-gray-600">
                    JWT Authentication and role-based access keep your financial data protected.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">
                    Smart Reports
                </h3>

                <p className="text-gray-600">
                    Analyze your spending using charts and financial reports.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">
                    Real-Time Alerts
                </h3>

                <p className="text-gray-600">
                    Receive instant budget notifications with Socket.io.
                </p>
            </div>

        </div>

    </div>

</section>
<section className="py-20 bg-slate-100">

    <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-12">
            What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <p className="text-gray-600">
                    "Finance Tracker helped me manage my monthly expenses easily."
                </p>

                <h3 className="mt-5 font-bold">
                    Rahul
                </h3>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <p className="text-gray-600">
                    "The dashboard and charts make budgeting simple."
                </p>

                <h3 className="mt-5 font-bold">
                    Priya
                </h3>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <p className="text-gray-600">
                    "Very secure and easy to use."
                </p>

                <h3 className="mt-5 font-bold">
                    Arjun
                </h3>
            </div>

        </div>

    </div>

</section>
<section className="bg-white py-20">

    <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
        </h2>

        <div className="space-y-6">

            <div className="border rounded-xl p-6">
                <h3 className="font-bold text-xl">
                    Is Finance Tracker free?
                </h3>

                <p className="mt-2 text-gray-600">
                    Yes. You can use all core features for free.
                </p>
            </div>

            <div className="border rounded-xl p-6">
                <h3 className="font-bold text-xl">
                    Is my financial data secure?
                </h3>

                <p className="mt-2 text-gray-600">
                    Yes. We use JWT Authentication and secure database storage.
                </p>
            </div>

            <div className="border rounded-xl p-6">
                <h3 className="font-bold text-xl">
                    Can I upload receipts?
                </h3>

                <p className="mt-2 text-gray-600">
                    Yes. You can upload receipt images while adding transactions.
                </p>
            </div>

        </div>

    </div>

</section>
<section className="bg-blue-700 text-white py-20">

    <div className="text-center">

        <h1 className="text-5xl font-bold">
            Ready to Manage Your Finances?
        </h1>

        <p className="mt-5 text-xl">
            Join Finance Tracker today and take control of your money.
        </p>

        <button
            onClick={() => navigate("/register")}
            className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200"
        >
            Get Started
        </button>

    </div>

</section>
<section className="bg-white py-20">

    <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-4xl font-bold">
            Contact Us
        </h2>

        <p className="mt-5 text-gray-600">
            Email: support@financetracker.com
        </p>

        <p className="mt-2 text-gray-600">
            Phone: +91 9876543210
        </p>

        <p className="mt-2 text-gray-600">
            Address: Hyderabad, Telangana, India
        </p>

    </div>
 
</section>

      {/* Footer */}

      <footer className="bg-slate-900 text-white py-8 mt-16">

        <div className="text-center">

          <h2 className="text-2xl font-bold">
            Finance Tracker
          </h2>

          <p className="mt-3 text-gray-400">
            Personal Finance & Expense Tracker Dashboard
          </p>

          <p className="mt-2 text-gray-500">
            © 2026 All Rights Reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;