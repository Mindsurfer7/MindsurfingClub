import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './FileUpload.module.scss';
import {
  getTaskTrackerIsLoading,
  getTranscribedVoice,
} from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { useSelector } from 'react-redux';
import { transcribeVoice } from './model/services/transcribeVoice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import LoaderIOS from 'shared/UI/Preloader/LoaderIOS';

interface FileUploadProps {
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ className }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const transcribedVoice = useSelector(getTranscribedVoice);
  const isLoading = useSelector(getTaskTrackerIsLoading);
  const dispatch = useAppDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'audio/mp3' || file.type === 'audio/ogg')) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid audio file (mp3 or ogg).');
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert('No file selected!');
      return;
    }

    dispatch(transcribeVoice(selectedFile));
  };
  return (
    <div className={classNames(cls.FileUpload, {}, [className as string])}>
      <input type="file" accept=".mp3,.ogg" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <button onClick={handleFileUpload}>Upload</button>
        </div>
      )}
      <div className="">
        {isLoading && <LoaderIOS color="white" />}
        {transcribedVoice && <span>{transcribedVoice}</span>}
      </div>
    </div>
  );
};

export default FileUpload;
