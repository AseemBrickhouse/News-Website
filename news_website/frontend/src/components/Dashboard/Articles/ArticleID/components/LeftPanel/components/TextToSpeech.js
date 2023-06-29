import React, { useEffect, useState, useMemo } from "react";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';

import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import "./css/TextToSpeech.css";
import ProgressBar from "./ProgressBar";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [stopped, setStopped] = useState(false);
  const [started, setStarted] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [synthesis, setSynthesis] = useState(window.speechSynthesis);
  const [voice, setVoice] = useState(null);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    synthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    setUtterance(utter);

    synthesis.addEventListener("voiceschanged", () => {
      const voices = synthesis.getVoices();
      setVoice(voices[0]);
    });

    return () => {
      synthesis.cancel();
      synthesis.removeEventListener("voiceschanged", () => {
        setVoice(null);
      });
    };
  }, [text]);

  const handlePlay = () => {
    if (isPaused) {
      if(started){
        synthesis.resume();
      }else{
        setStarted(true);
        utterance.voice = voice;
        utterance.volume = volume;
        synthesis.speak(utterance);
      }
    }else{
      utterance.voice = voice;
      utterance.volume = volume;
      synthesis.speak(utterance);
    }
    setStopped(false);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    synthesis.pause();
  };

  const handleStop = () => {
    setIsPaused(true);
    setStopped(true);
    setStarted(false);
    synthesis.cancel();
  };
  const handleVoiceChange = (event) => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices.find((e) => e.name === event.target.value));
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
    <div className="main-container-tts">
      <div className="main-container-top-box">
        <div className="input-box1">
          <span className="input-text">Voice:</span>
          <select value={voice?.name} onChange={handleVoiceChange}>
            {window.speechSynthesis.getVoices().map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-box2">
          <button onClick={handlePlay} className="input-box2-button">
            {isPaused ? (
              <NotStartedOutlinedIcon
                sx={{
                  fontSize: 40,
                }}
              />
            ) : (
              <PlayCircleOutlineOutlinedIcon
                sx={{
                  fontSize: 40,
                }}
              />
            )}
          </button>
          <button onClick={handlePause} className="input-box2-button">
            <PauseCircleOutlineOutlinedIcon
              sx={{
                fontSize: 40,
              }}
            />
          </button>
          <button onClick={handleStop} className="input-box2-button">
            <StopCircleOutlinedIcon
              sx={{
                fontSize: 40,
              }}
            />
          </button>
        </div>
        <div className="input-box3">
          <span className="input-text">Volume:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      <div className="main-container-bottom-box">
        <ProgressBar 
          text={text}
          isPaused={isPaused}
          stop={stopped}
        />
      </div>
    </div>
  );
};
export default TextToSpeech;
{
  /* <StopCircleOutlinedIcon onClick={handleStop}/> */
}
{
  /* <PauseCircleOutlineOutlinedIcon onClick={handlePause}/> */
}
{
  /* {isPaused ? 
          <div onClick={handlePlay}>
            <PlayCircleOutlineOutlinedIcon/> 
          </div>:
          <div onClick={handlePause}>
            <PauseCircleOutlineOutlinedIcon/>
          </div>} */
}
{
  /* <div className="input-box">
        <span>Pitch:</span>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={pitch}
          onChange={handlePitchChange}
        />
      </div>

      <div className="input-box">
        <span>Speed:</span>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
        />
      </div> */
}
