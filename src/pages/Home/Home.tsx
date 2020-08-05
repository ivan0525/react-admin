import React, { FC } from 'react'
import DragFileUpload from '../../components/DragFileUpload'
import '../../components/DragFileUpload/index.less'
const Home: FC = () => {
  function onUpload(files: any) {
    console.log(files)
  }
  return (
    <div>
      1
      <DragFileUpload onUpload={onUpload} count={1} formats={['jpg', 'png', 'gif', 'md']}>
        <div className="FilesDragAndDrop__area">
          传下文件试试？
          <span role="img" aria-label="emoji" className="area__icon">
            &#128526;
          </span>
        </div>
      </DragFileUpload>
    </div>
  )
}

export default Home
