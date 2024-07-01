import React, { useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AudioRecorder.module.scss';
import { useAudioRecorder } from '../model/useAudioRecorder';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useHandler } from 'shared/lib/hooks/useHandler';

interface AudioRecorderProps {
  className?: string;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ className }) => {
  const [audioType, setAudioType] = useState<'wav' | 'mp3' | 'ogg'>('mp3');
  const { isRecording, startRecording, stopRecording, audioUrl } =
    useAudioRecorder(audioType);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const onRecClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const downloadAudio = () => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.click();
    }
  };

  const getFileName = (string: string) => {
    const parts = string.split('/');

    return parts[parts.length - 1];
  };

  return (
    <div className={classNames(cls.AudioRecorder, {}, [className as string])}>
      <div className={cls.wrap}>
        <span className={cls.text}>
          Тут можно записать голосовое сообщение, чтобы после использовать его
          для расшифровки.
        </span>

        <Button
          onClick={onRecClick}
          theme={ButtonTheme.OUTLINE}
          className={classNames(cls.recordBtn, { [cls.isRec]: isRecording }, [
            className,
          ])}
        >
          Запись
        </Button>

        <div className={cls.btns}>
          <Button
            onClick={() => setAudioType('mp3')}
            theme={
              audioType === 'mp3'
                ? ButtonTheme.FILLED_GREEN
                : ButtonTheme.OUTLINE
            }
          >
            mp3
          </Button>

          <Button
            onClick={() => setAudioType('wav')}
            theme={
              audioType === 'wav'
                ? ButtonTheme.FILLED_GREEN
                : ButtonTheme.OUTLINE
            }
          >
            wav
          </Button>

          <Button
            onClick={() => setAudioType('ogg')}
            theme={
              audioType === 'ogg'
                ? ButtonTheme.FILLED_GREEN
                : ButtonTheme.OUTLINE
            }
          >
            ogg
          </Button>
        </div>

        {audioUrl && (
          <>
            <audio controls>
              <source src={audioUrl} type={`audio/${audioType}`} />
            </audio>
            <Button onClick={downloadAudio} theme={ButtonTheme.OUTLINE}>
              Скачать
            </Button>
            <a
              ref={downloadLinkRef}
              href={audioUrl}
              download={`${getFileName(audioUrl)}.${audioType}`}
              style={{ display: 'none' }}
            >
              Скачать аудио
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
