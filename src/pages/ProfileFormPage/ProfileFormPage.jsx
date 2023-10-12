import { useState } from 'react'; 
import * as profileAPI from "../../utilities/profiles-api"
import { useNavigate } from 'react-router-dom';

export default function ProfileFormPage () {
    const [formData, setFormData] = useState({
        about: '', 
        genres: '',
        artists: '',
        age: 18,
    })
    const [error, setError] = useState('')

    const navigate = useNavigate()
    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
        setError('')
    }
    
    async function handleSubmit (e) {
        e.preventDefault()
        try {
            const profile = await profileAPI.addUserInfo(formData) //
            // setUser(user) 
            navigate('/playlists')
        } catch {
            setError('Profile Creation Failed - Try Again')
        }
    }

    return (
        <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Age</label>
            <input type="number" name="age" min={'18'} max={'100'} value={formData.age} onChange={handleChange} required />
            <label>About You</label>
            <input type="text" name="about" maxLength={'500'} value={formData.about} onChange={handleChange} required />
            <label>Genres You Like</label>
            <input type="text" name="genres" maxLength={'50'} value={formData.genres} onChange={handleChange} required />
            <label>Artists You Like</label>
            <input type="text" name="artists" maxLength={'100'} value={formData.artists} onChange={handleChange} required />
            <button type="submit">Finish Creating My Profile</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{error}</p>
      </div>
    )
    }
