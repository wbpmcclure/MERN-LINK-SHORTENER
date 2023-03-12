import { useState } from "react";
import useLinksContext from "../hooks/useLinksContext";

const LinkForm = () => {

    const {dispatch} = useLinksContext();
    const [destination, setDestination] = useState('');
    const [shortenedLink, setShortenedLink] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const link = {destination, shortenedLink};

        const response = await fetch('/api/links', {
            method: 'POST',
            body: JSON.stringify(link),
            headers: {
              'Content-Type': 'application/json'
            }
          })

          const json = await response.json()
      
          if (response.ok) {
            setError(null)
            setDestination('')
            setShortenedLink('')
            setEmptyFields([])
            dispatch({type: 'CREATE_LINK', payload: json});
          } else {
            setError(json.error);
            setEmptyFields(json.emptyFields)
          }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a New Link</h3>

            <div className="input">
                <label>Destination:</label>
                <input 
                type="text" 
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
                className={emptyFields.includes('destination') ? 'error': ''}
                />
            </div>
            <div className="input">
                <label>Shortened Link Text:</label>
                <input 
                type="text" 
                onChange={(e) => setShortenedLink(e.target.value)}
                value={shortenedLink}
                className={emptyFields.includes('shortenedLink') ? 'error': ''}
                />
            </div>
            
            <button>Create Link</button>
            <div className="error">
              {error && <p>{error}</p>}
            </div>
        </form>
     );
}
 
export default LinkForm;