import { useParams, useNavigate } from "react-router-dom";

const Redirect = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const findLink = async(id) => {
        const destination = await fetch('/api/links/' + id).catch((error) => {
            console.log(error);
        });

        const json = await destination.json();

        if(destination.ok) {
            window.location.href = json.destination;
        }
        else {
            navigate('/notfound');
        }
    }

    findLink(id);

    return ( 
        <div className="redirect">
            
        </div>
     );
}
 
export default Redirect;