import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ImageUploader.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { uploadImage } from '../model/services/uploadImage';
import { useSelector } from 'react-redux';
import { getArticleImageLink } from 'widgets/TextEditor/model/selectors/getTextEditorData';
import { UploadPath } from '../model/types/uploadPath';

interface ImageUploaderProps {
  className?: string;
  uploadPath: UploadPath;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  className,
  uploadPath,
}) => {
  const dispatch = useAppDispatch();
  const imageURL = useSelector(getArticleImageLink);

  // const onFileChoose = (e: ChangeEvent<HTMLInputElement>) => {
  //     //@ts-ignore
  //     setFile(e.target.files[0]);
  //     console.log(file);
  //   };

  return (
    <div className={classNames(cls.ImageUploader, {}, [className as string])}>
      <input
        type="file"
        className={cls.Inp}
        onChange={(e: any) => {
          dispatch(
            uploadImage({
              path: uploadPath,
              file: e.target.files[0],
            }),
          );
        }}
      />
      <img src={imageURL} className={cls.img} />
    </div>
  );
};

export default ImageUploader;
