import { useState, useRef } from 'react'; 
import * as profileAPI from "../../utilities/profiles-api"
import { useNavigate } from 'react-router-dom';
import "./ProfileFormPage.css"
import { Button } from 'react-bootstrap';

export default function ProfileFormPage () {
    const [formData, setFormData] = useState({
        about: '', 
        genres: '',
        artists: '',
        age: 18,
    })
    const [error, setError] = useState('')
    const [photo, setPhoto] = useState(null)
    const fileInputRef = useRef();

    const navigate = useNavigate()
    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
        setError('')
    }
    
    async function handleSubmit (e) {
        e.preventDefault()
        try {
            const profile = await profileAPI.addUserInfo(formData) //
            // photo upload 
            const photoFormData = new FormData();
            let photoArr = []
            console.log(photo)
            for (let i=0; i < photo.length; i ++) {
              photoFormData.append('photo', photo[i]);
            }
            const newPhoto = await profileAPI.uploadPhoto(photoFormData);
            console.log(photoFormData.getAll('photo'))
            navigate('/playlists')
            // 
           
        } catch {
            setError('Profile Creation Failed - Try Again')
        }
    }

  const MAX_LENGTH = 6;

  function uploadMultipleFiles(e){
    if (Array.from(e.target.files).length > MAX_LENGTH) {
      e.preventDefault();
      alert(`Cannot upload more than ${MAX_LENGTH} photos`);
      fileInputRef.current.value = ''
      return;
    } 
    setPhoto(e.target.files)
    console.log(e.target.files)
  }

    return (
      <main className="main-content">
          <div>
          <div className="form-container">
            <form autoComplete="off" onSubmit={handleSubmit} >
              <label>Age</label>
              <input type="number" name="age" min={'18'} max={'100'} value={formData.age} onChange={handleChange} required />
              <label>About You</label>
              <textarea type="text" name="about" maxLength={'500'} value={formData.about} onChange={handleChange} required />
              <label>Genres You Like</label>
              <input type="text" name="genres" maxLength={'50'} value={formData.genres} onChange={handleChange} required />
              <label>Artists You Like</label>
              <input type="text" name="artists" maxLength={'100'} value={formData.artists} onChange={handleChange} required />
              <label>Photos for your profile (max: 6):</label>
              <input type="file"
              // enctype="multipart/form-data"
              ref={fileInputRef}
              onChange={(e) => uploadMultipleFiles(e)} 
                accept=".jpg,.jpeg,.png,.heif,.heifs.heic,.heics.avci,.avcs.avif,.HIF" multiple required/>
              <Button type="submit">Finish Creating My Profile</Button>
            </form>
            <img src="" alt="" />
          </div>
          <p className="error-message">&nbsp;{error}</p>
        </div>
      </main>
    )
    }
