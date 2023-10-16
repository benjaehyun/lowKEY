import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import * as profileAPI from "../../utilities/profiles-api"

export default function ProfileShowPage({}) {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [profile, setProfile] = useState({})
    useEffect(function () {
        async function getApiProfile() {
            const apiProfile = await profileAPI.getProfile()
            setProfile({...apiProfile})
        }
        getApiProfile()
    }, [])


    const photoList = profile?.photos?.map((photo, idx)=> {
        return (
          <Carousel.Item interval={3000}>        
        <img
          height={'300px'}
          src={photo}
          alt="slider image"
          
        />
      </Carousel.Item>
        )
      })

      const handleSelect = (selectedIndex) => {
        setPhotoIndex(selectedIndex);
      };

    
    return (
        <main className="main-content">
            <div>
                <h1>Profile Show Page</h1>
                <h4> {profile.name}, {profile.age} </h4>
                <Carousel  onSelect={handleSelect}>
                        {photoList}
                    </Carousel>
                <h5> About you: {profile.about} </h5>
                <h5> Genres you like: {profile.genres} </h5>
                <h5> Artists you like: {profile.artists} </h5>
                {/* <Link to={'/features'}>
                    <button> go to get spotify features </button>
                </Link> */}
            </div>
        </main>

    )
}