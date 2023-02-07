import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

export type ContainerProps = React.PropsWithChildren<any>;

const Container: React.FC<ContainerProps> = ({children}) => {

    return (
        <div className="w-full h-[100vh] text-center flex items-center justify-center">
            {children}
        </div>
    );
}

export default Container;