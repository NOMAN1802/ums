type NewsItemType = {
  title: string;
  image: string;
  // add other properties as needed
};

const News = ({ item }: { item: NewsItemType }) => {
  // console.log(item);
  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-md p-2">
      <img src={item.image} alt="Notice" className="rounded-md" />

      <div className="mt-2 flex-grow">
        <p className="text-sm font-semibold text-gray-800">{item.title}</p>
      </div>

      <div className="mt-auto">
        <button className="relative rounded-sm flex items-center gap-1 w-full px-1 py-1 text-white text-[12px] font-semibold overflow-hidden bg-green-500 transition-all duration-700 before:absolute before:inset-0 before:bg-green-700 before:-translate-y-full before:transition-transform before:duration-700 hover:before:translate-y-0 before:z-0 cursor-pointer">
          <span className="relative z-10 flex items-center gap-3 mx-auto">
            <p>View Notice</p>
          </span>
        </button>
      </div>
    </div>
  );
};

export default News;
