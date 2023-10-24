import { Radar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
  } from 'chart.js';
import { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap';
import * as profilesAPI from "../../utilities/profiles-api"
import "./MatchCard.css"

export default function MatchCard({matchProfile}) {
    const [data, setData] = useState({})
    const [photoIndex, setPhotoIndex] = useState(0);
    
    useEffect(function () {
        async function getMatchSongData(){
            const apiSongData = await profilesAPI.fetchMatchSongData(matchProfile)
            console.log(apiSongData)
            setData(apiSongData)
        }
        getMatchSongData()
    }, [matchProfile]) 

    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
      );

    function removeDupes (arr) {
        let originalSet = new Set (arr)
        let newArr = Array.from(originalSet)
        const returnArr = newArr.slice(0,5)
        return returnArr
    }

    function showArr(arr) {
        const cleanArr = removeDupes(arr)
        const returnArr = cleanArr.map(function (el, idx) {
            if (idx < cleanArr.length - 1) return <p key={idx}>{el}, &nbsp;</p>
            else return <p key={idx}>{el} &nbsp;</p>
        })
        return returnArr
    }

    let chartData = {
        labels: ['energy', 'instrumentalness', 'danceability', 'acousticness', 'valence' ], 
        datasets: [{
            label: `Your musical overlap with ${matchProfile.name}`, 
            data: data?.scores, 
            fill: true, 
            backgroundColor: 'rgba(235, 52, 195, 0.2', 
            borderColor: 'rgb(235, 52, 195)',
            
        }]
    }

    const photoList = matchProfile?.photos?.map((photo, idx)=> {
        return (
          <Carousel.Item interval={3000}>        
        <img
          height={'150px'}
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
        <div className='matchcard-div'>
            <div style={{height: '30vh'}}>
                <Radar data={chartData} options={{ maintainAspectRatio: false, scales: {r:{ticks:{display:false}}}, plugins: {legend: {labels:{boxWidth:0}}} }} />
            </div>
            <h2>{matchProfile.name}, {matchProfile.age}</h2>
            <Carousel  onSelect={handleSelect}>
                        {photoList}
                    </Carousel>
            <h4>About: {matchProfile.about}</h4>
            <h4>Artists They Like: {matchProfile.artists}</h4>
            <h4>Genres They Like: {matchProfile.genres}</h4>
        </div>
    )
}