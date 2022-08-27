
import './CreateInterestPopup.css'

interface CreateInterestPopupProps{
  closePopup: () => void
}


const CreateInterestPopup: React.FC<CreateInterestPopupProps> = ({closePopup}) => {
  return (
    <div className='CreateInterestPopup'>  
      <div className='CreateInterestOpen'>  
        <div className="Title">
          <h3 style={{paddingLeft: "15px"}}>Create interest</h3>
          <span className="ClosePopupButton" onClick={() => closePopup()} style={{fontFamily: "sans-serif"}}> <b>x</b></span>
        </div>
        <div className="CInterestName">
          <input type="text" className="InputInterestCreate" placeholder="Type the name" title='Name' />
        </div>
        <div className="CInterestStateTypeGenres">
          <label className="DarkSelect" title='State' >
            <select>
              <option value="Select" selected hidden >Select the state</option>
              <option value="State">Ongoing</option>
              <option value="Type">Completed</option>
              <option value="Genre">Nearby</option>
            </select>
          </label>
          <label className="DarkSelect" title='Type'>
            <select>
              <option value="Select" selected hidden >Select the type</option>
              <option value="State">Anime</option>
              <option value="Type">Manga</option>
              <option value="Genre">Book</option>
            </select>
          </label>
          <label className="DarkSelect" title='Genre'>
            <select>
              <option value="Select" selected hidden >Select the genre</option>
              <option value="Historical">Historical</option>
              <option value="Comedy">Comedy</option>
              <option value="Romance">Romance</option>
            </select>
          </label>
        </div>
        <div className="CInterestContent">
          <input type="text" className="InputInterestCreate" placeholder="Type the access content" title='Content' />
        </div>
        <div className="CInterestScoreCurrentlyTotalCreate">
          <input type="text" className="InputInterestCreate" placeholder="Type a score" title='Score' />
          <input type="text" className="InputInterestCreate" placeholder="Type progress" title='Progress' />
          <input type="text" className="InputInterestCreate" placeholder="Type total" title='Total' />
          <button
            className="ButtonFilter"
            type="button">
          Create
          </button>
        </div>
      </div>  
    </div> 
  );
};

export default CreateInterestPopup;