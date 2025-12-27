import { LayoutList, CheckCircle2, Clock } from "lucide-react";

const SummaryBar = ({ summary }) => {
  const cards = [
    {
      label: "Total Tasks",
      value: summary.total,
      icon: LayoutList,
      color: "text-violet-600",
      bg: "bg-violet-100",
      border: "border-violet-100",
    },
    {
      label: "Completed",
      value: summary.completed,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      border: "border-emerald-100",
    },
    {
      label: "Remaining",
      value: summary.remaining,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-100",
      border: "border-amber-100",
    },
  ];

  return (
    <div className="container mx-auto pt-8 px-4 sm:px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-500 font-medium text-sm mb-1">
                  {item.label}
                </p>
                <h3 className={`text-4xl font-bold ${item.color}`}>
                  {item.value}
                </h3>
              </div>
              <div className={`p-4 rounded-xl ${item.bg}`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryBar;
