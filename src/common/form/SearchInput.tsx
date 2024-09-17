import SearchOutline from "../icons/SearchOutline";

type props = {
  type?: "outline" | "normal";
  placeholder?: string;
  otherProps?: any;
};

const SearchInput: React.FC<props> = ({
  type = "normal",
  placeholder,
  otherProps = {},
}) => {
  return (
    <div className={`relative w-full`}>
      <span
        className={`absolute left-4 top-1/2 -translate-y-1/2 ${type === "outline" && "hidden"}`}
      >
        <SearchOutline />
      </span>
      <input
        placeholder={placeholder ? placeholder : "search"}
        type="text"
        className={`h-full w-full px-4 py-3 [background-origin:border-box] ${type === "outline" ? "rounded-3xl border border-[#DBDCDE]" : "rounded-md bg-[#EDEEEF] !px-10"} focus:outline-none ${otherProps.className ? otherProps.className : ""}`}
        {...otherProps}
      />
      <span
        className={`absolute right-4 top-1/2 -translate-y-1/2 ${type === "normal" && "hidden"}`}
      >
        <SearchOutline />
      </span>
    </div>
  );
};

export default SearchInput;