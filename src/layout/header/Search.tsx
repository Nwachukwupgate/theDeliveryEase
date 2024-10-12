import SearchInput from "@/common/form/SearchInput";

const Search: React.FC = () => {
  return (
    <div className="w-[300px] xl:w-[70%]">
      <form className="w-full">
        <SearchInput type="outline" placeholder="Track delivery by tracking number" />
      </form>
    </div>
  );
};

export default Search;