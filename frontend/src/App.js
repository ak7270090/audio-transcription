import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { useState } from 'react';
import Modal from './Modal';

const App = () => {


    const [openModal, setOpenModal] = useState(false);
    const [apidata, setApidata] = useState(false);
    const [apiotherdata, setApiotherdata] = useState(false);

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript,resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
     
    

    const checkerrorapi = async () => {
        try {
            SpeechRecognition.stopListening();
            if (transcript.length === 0) {
                alert("Text cannot be empty");
            }
            else {
                const res = await axios.post(`http://localhost:8080/checkerrors`,
                    { data: transcript }, { validateStatus: false, withCredentials: true });
                await  setApidata(res.data.data.response.errors);
                await setApiotherdata(res.data);
                    console.log('res', res);
                
                setOpenModal(true);
                
            }
        }
        catch(err) {
            alert('Grammar checking api is not working. Try later.');
        }
    }

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <>

            {openModal && <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                showData={apidata}
                cleardata={() => {setApidata(false); setApiotherdata(false);}}
                apiotherdata={apiotherdata}
                 />}

            <div className="container">
                <h2>Audio Transcription</h2>
                <br />
                <p>Check your Grammar Proficieny Today</p>
                <p><b>Try - </b>He is going school.</p>
                <div className="main-content">
                    {transcript}
                </div>

                <div className="btn-style">

                    
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                    <button onClick={checkerrorapi}>
                        check Errors!
                    </button>
                    <button onClick={() => {resetTranscript(); startListening() }}>
                        Start Again
                    </button>
                </div>

            </div>




        </>
    );
};

export default App;