import useHideOnClickedOutside from "@/hooks/useHideOnClickedOutside";
import { useState } from "react";

type callback = (
  closeHandler: React.Dispatch<React.SetStateAction<boolean>>,
) => React.ReactNode;

type AppMenuWrapperProps = {
  header: React.ReactNode;
  border?: boolean;
  className?: string;
  children?: React.ReactNode | callback;
};
const AppMenuWrapper: React.FC<AppMenuWrapperProps> = ({
  header,
  children,
  className,
  border = true,
}) => {
  const [opened, setOpened] = useState(false);
  const ref = useHideOnClickedOutside(setOpened.bind(undefined, false));

  return (
    <div
      ref={ref}
      className={`relative rounded-lg ${border && "border"} ${className}`}
    >
      <button
        onClick={setOpened.bind(undefined, !opened)}
        className="[appearance:none]"
      >
        {header}
      </button>
      <div
        className={`invisible absolute right-0 top-[calc(100%+20px)] z-[10] rounded-lg transition-all ${opened && "!visible !top-[calc(100%+15px)]"}`}
      >
        {typeof children === "function" ? children(setOpened) : children}
      </div>
    </div>
  );
};

export default AppMenuWrapper;