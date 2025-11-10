import { LuRefreshCw } from "react-icons/lu";

const AdminDashboardBarTittle = ({ tittle }: { tittle: string }) => {
  return (
    <div className="flex justify-between items-center pb-5">
      <p className="font-semibold text-[15px] text-gray-700">{tittle}</p>
      <div className="flex gap-3 text-gray-500 px-2 cursor-pointer py-2 bg-gray-200 rounded-md hover:bg-gray-100">
        <p>Refresh</p>
        <LuRefreshCw size={20} />
      </div>
    </div>
  );
};

export default AdminDashboardBarTittle;
