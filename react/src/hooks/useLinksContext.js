import { LinksContext } from "../context/LinksContext"
import { useContext } from "react";

const useLinksContext = () => {
    const context = useContext(LinksContext);

    if(!context) {
        throw Error('useLinksContext must be used inside a LinksContextProvider')
    }

    return context;
}
 
export default useLinksContext;