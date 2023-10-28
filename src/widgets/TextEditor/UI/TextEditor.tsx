import React, { useCallback, useRef, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TextEditor.module.scss';
import { setText } from '../model/slices/textEditorSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { getTextEditorValue } from '../model/selectors/getTextEditorData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { uploadImage } from 'features/UploadImage/model/services/uploadImage';

interface TextEditorProps {
  className?: string;
  //text: string;
  onPublish?: () => void;
  // onChangeText: (value: string) => void;
  clsModification: any;
}

const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline'],
      ['blockquote', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ direction: 'rtl' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
    // handlers: {

    // },
  },
};

const TextEditor: React.FC<TextEditorProps> = ({
  className,
  clsModification,
}) => {
  const text = useSelector(getTextEditorValue) || '';
  const { t } = useTranslation();
  var dispatch = useAppDispatch();
  const quillRef = useRef<ReactQuill | null>(null);

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files![0];

      if (file && quillRef.current) {
        const imageURL = await dispatch(uploadImage(file));
        const quill = quillRef.current.getEditor();

        if (quill) {
          console.log(quill);
          const range = quill.getSelection();
          const position = range ? range.index : 0;

          quill.insertEmbed(position, 'image', imageURL.payload);
        }
      }
    };
  };

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();

      if (quill) {
        quill.getModule('toolbar').addHandler('image', handleImageUpload);
        quill.focus();
      }
    }
  }, [quillRef]);

  const onChangeText = useCallback(
    (value: string) => {
      dispatch(setText(value));
    },
    [dispatch],
  );

  return (
    <ReactQuill
      ref={quillRef}
      value={text}
      modules={modules}
      onChange={onChangeText}
      placeholder="Write your best ideas here...)"
      // theme="snow"
      className={classNames(cls.quill, clsModification, [className as string])}
    />
  );
};

export default TextEditor;
