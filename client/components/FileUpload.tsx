import React, { memo, useRef, useState } from 'react';

interface FileUploadProps {
  setFile: Function;
  accept: string;
  children: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children }) => {
  const ref = useRef<HTMLInputElement>()
  const [uploaded, setUploaded] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
    setUploaded(true)
  }

  return (
    <div onClick={() => ref.current.click()}>
      <input
        type='file'
        accept={accept}
        style={{display: 'none'}}
        ref={ref}
        onChange={onChange}
      />
      {children} {uploaded && 'Загружено!'}
    </div>
  );
};

export default memo(FileUpload);