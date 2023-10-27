import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ImageUploader.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { uploadImage } from '../model/services/uploadImage';
import { useSelector } from 'react-redux';
import { getArticleImageLink } from 'widgets/TextEditor/model/selectors/getTextEditorData';

interface ImageUploaderProps {
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ className }) => {
  const [file, setFile] = useState([]);
  const dispatch = useAppDispatch();
  const image = useSelector(getArticleImageLink);

  // const onFileChoose = (e: ChangeEvent<HTMLInputElement>) => {
  //     //@ts-ignore
  //     setFile(e.target.files[0]);
  //     console.log(file);
  //   };
  return (
    <div className={classNames(cls.ImageUploader, {}, [className as string])}>
      <input
        type="file"
        onChange={(e: any) => {
          dispatch(uploadImage(e.target.files[0]));
        }}
      />
      <img src={image} className={cls.img} />
    </div>
  );
};

export default ImageUploader;
