import useLinksContext from "../hooks/useLinksContext"
import { Link } from "react-router-dom"

const LinkDetails = ({link}) => {
    const {dispatch} = useLinksContext();


    const handleDelete = async() => {
        const response = await fetch('/api/links/' + link._id, {
            method: "DELETE"
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type: "DELETE_LINK", payload: json})
        }
    }

    return ( 
        <div className="link-details">
            <p>Shortened Link:    <Link to={link.shortenedLink}>http://localhost:3000/{link.shortenedLink}</Link></p>
            <p className="destination">To:    <a href="{link.destination}" >{link.destination}</a></p>
            <p className="date">{link.updatedAt}</p>
            <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
     );
}
 
export default LinkDetails;