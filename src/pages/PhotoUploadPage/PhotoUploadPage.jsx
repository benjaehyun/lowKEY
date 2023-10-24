// import { useNavigate } from "react-router-dom";
// import { useState, useRef, useEffect } from 'react';

// export default function PhotoUploadPage() {
//     //   Use a ref prop on the <input> in the JSX to
//     // create a reference to the <input>, i.e.,
//     // inputRef.current will be the <input> DOM element
//     const fileInputRef = useRef();
//     navigate = useNavigate()
//     async function handleUpload() {
//         // Use FormData object to send the inputs in the fetch request
//         // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_a_file
//         const formData = new FormData();
//         formData.append('photo', fileInputRef.current.files[0]);
//         const newPhoto = await photosAPI.upload(formData);
//         navigate('/playlists')
//       }

//     return (
//         <section className="flex-ctr-ctr">
//             <input type="file" ref={fileInputRef} multiple required/>
//             <button onClick={handleUpload}>Upload Photo</button>
//         </section>
     
//     ) 
// }

