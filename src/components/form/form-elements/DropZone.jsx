"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const DropzoneComponent = ({ setVoicefile }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setAudioFile(file);
      setVoicefile(file)
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  };
  console.log("audioUrl", audioUrl)
  console.log("audioFile", audioFile)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [], // .mp3
      "audio/wav": [],  // .wav
      "audio/ogg": [],  // .ogg
      "audio/webm": [], // .webm
    },
  });

  return (
    <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
      <form
        {...getRootProps()}
        className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
          ${isDragActive
            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
          }`}
        id="demo-upload"
      >
        <input {...getInputProps()} />

        <div className="dz-message flex flex-col items-center m-0!">
          <div className="mb-[22px] flex justify-center">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              🎵
            </div>
          </div>

          <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
            {isDragActive ? "Drop Voice File Here" : "Drag & Drop Voice File Here"}
          </h4>

          <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
            Drop or browse MP3, WAV, OGG, WEBM audio files
          </span>

          <span className="font-medium underline text-theme-sm text-brand-500">
            Browse File
          </span>
        </div>
      </form>

      {/* Audio Player */}
      {audioUrl && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          {/* <p className="mb-2 text-gray-800 dark:text-white">Playing: {audioFile?.name}</p> */}
          <audio controls src={audioUrl} className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default DropzoneComponent;
