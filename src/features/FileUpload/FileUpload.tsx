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
import Button, { ButtonTheme } from 'shared/UI/Button/Button';

interface FileUploadProps {
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ className }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const transcribedVoice = useSelector(getTranscribedVoice);
  const isLoading = useSelector(getTaskTrackerIsLoading);
  const dispatch = useAppDispatch();

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === 'audio/mpeg' ||
        file.type === 'audio/ogg' ||
        file.type === 'audio/wav')
    ) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid audio file (mp3 / ogg / wav).');
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
      <div className={cls.wrap}>
        <span className={cls.text}>
          Тут можно выбрать файл в формате ogg / mp3 для отправки на сервера
          whisper ai.
        </span>
        <div className={cls.fileInputWrapper}>
          <input
            id="fileInput"
            type="file"
            accept=".mp3,.ogg,.wav"
            onChange={handleFileChange}
            className={cls.fileInput}
          />
          <label htmlFor="fileInput" className={cls.fileInputLabel}>
            Выберите файл
          </label>
          {selectedFile && (
            <div className={cls.chooseInterface}>
              <span className={cls.choosenFile}>
                Выбранный файл: {selectedFile.name}
              </span>
              <Button
                className={cls.recBtn}
                theme={ButtonTheme.OUTLINE}
                onClick={handleFileUpload}
              >
                Расшифровать
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className={cls.answerText}>
        {isLoading && <LoaderIOS color="white" />}

        {transcribedVoice && <span>{transcribedVoice}</span>}
      </div>
    </div>
  );
};

export default FileUpload;
