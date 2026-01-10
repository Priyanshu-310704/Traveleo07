import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FiDownload, FiFileText } from "react-icons/fi";

const ExportButtons = ({ data }) => {
  const exportCSV = () => {
    if (!data.length) return;

    const rows = [
      ["S.No", "Trip", "Category", "Amount", "Date"],
      ...data.map((e, i) => [
        i + 1,
        e.trip_title,
        e.category,
        e.amount,
        new Date(e.expense_date).toLocaleDateString(),
      ]),
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "traveleo-expense-history.csv";
    link.click();
  };

  const exportPDF = () => {
    if (!data.length) return;

    const doc = new jsPDF("p", "pt");

    doc.setFontSize(18);
    doc.text("TraveLeo – Expense History", 40, 40);

    autoTable(doc, {
      startY: 70,
      head: [["#", "Trip", "Category", "Amount", "Date"]],
      body: data.map((e, i) => [
        i + 1,
        e.trip_title,
        e.category,
        `₹${e.amount}`,
        new Date(e.expense_date).toLocaleDateString(),
      ]),
      styles: {
        fontSize: 10,
        textColor: [20, 20, 20],
      },
      headStyles: {
        fillColor: [16, 185, 129], // emerald
        textColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      margin: { left: 40, right: 40 },
    });

    doc.save("traveleo-expense-history.pdf");
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {/* CSV */}
      <button
        onClick={exportCSV}
        className="
          flex items-center gap-3 px-5 py-2.5 rounded-xl
          bg-white/10 backdrop-blur-xl
          border border-white/15
          text-white font-medium text-sm
          hover:bg-emerald-500/15 hover:border-emerald-400/40
          hover:shadow-lg hover:shadow-emerald-500/20
          transition-all
        "
      >
        <FiDownload className="text-emerald-400" size={18} />
        Export CSV
      </button>

      {/* PDF */}
      <button
        onClick={exportPDF}
        className="
          flex items-center gap-3 px-5 py-2.5 rounded-xl
          bg-white/10 backdrop-blur-xl
          border border-white/15
          text-white font-medium text-sm
          hover:bg-cyan-500/15 hover:border-cyan-400/40
          hover:shadow-lg hover:shadow-cyan-500/20
          transition-all
        "
      >
        <FiFileText className="text-cyan-400" size={18} />
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;
