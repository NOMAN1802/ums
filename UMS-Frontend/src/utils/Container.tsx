import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[1300px] mx-auto xl:px-16 md:px-10 sm:px-8 px-4">
      {children}
    </div>
  );
};

export default Container;
