const ExpenseTable = ({ expenses }) => {
  return (
    <div className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-white/10">
          <tr>
            <th className="px-6 py-4 text-left">#</th>
            <th className="px-6 py-4 text-left">Trip</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Amount</th>
            <th className="px-6 py-4 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-10 text-center text-white/50"
              >
                No expenses found
              </td>
            </tr>
          ) : (
            expenses.map((e, i) => (
              <tr
                key={e.id}
                className="border-t border-white/10 hover:bg-white/5"
              >
                <td className="px-6 py-4">{i + 1}</td>
                <td className="px-6 py-4">{e.trip_title}</td>
                <td className="px-6 py-4">{e.category}</td>
                <td className="px-6 py-4">₹{e.amount}</td>
                <td className="px-6 py-4">
                  {new Date(e.expense_date).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
