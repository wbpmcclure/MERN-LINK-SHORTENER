import LinkDetails from "../components/LinkDetails";
import LinkForm from "../components/LinkForm";
import { useEffect } from 'react';

import useLinksContext from "../hooks/useLinksContext";

const Home = () => {
    
    const { links, dispatch} = useLinksContext();

    useEffect(() => {
        const fetchLinks = async () => {
            const newLinks = await fetch('/api/links').catch((error) => {
                console.log(error);
            });
            const json = await newLinks.json()
    
            if(newLinks.ok) {
                dispatch({type: "SET_LINKS", payload: json})
            }
        }

        fetchLinks();
    }, [dispatch])
    
    return ( 
        <div className="home">
            <h2>LINK-SHRTNR</h2>
            <div className="link-list">
                {links && links.map(link => (
                <LinkDetails link={link} key={link._id} />
                ))}
                {!links && <h3>No links to display</h3>}
            </div>
            <div className="form">
                <LinkForm />
            </div>
        </div>
     );
}
 
export default Home;