import React, { useState, useRef, useEffect } from 'react'
import './index.less'

interface DragFileUploadProp {
  onUpload?: (file: any) => void
  children?: JSX.Element
  count?: number
  formats?: string[]
}
const DragFileUpload = (props: DragFileUploadProp) => {
  const [dragging, setDragging] = useState(false)
  const [message, setMessage] = useState({ show: false, text: null, type: null })
  const drop = useRef() as any
  const drag = useRef()
  useEffect(() => {
    // useRef 的 drop.current 取代了 ref 的 this.drop
    drop.current.addEventListener('dragover', handleDragOver)
    drop.current.addEventListener('drop', handleDrop)
    drop.current.addEventListener('dragenter', handleDragEnter)
    drop.current.addEventListener('dragleave', handleDragLeave)
    return () => {
      drop.current.removeEventListener('dragover', handleDragOver)
      drop.current.removeEventListener('drop', handleDrop)
      drop.current.removeEventListener('dragenter', handleDragEnter)
      drop.current.removeEventListener('dragleave', handleDragLeave)
    }
  })
  const handleDragOver = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
    const { count, formats } = props
    const files = [...e.dataTransfer.files]

    if (count && count < files.length) {
      showMessage(`抱歉，每次最多只能上传${count} 文件。`, 'error', 2000)
      return
    }

    if (
      formats &&
      files.some(
        (file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase()))
      )
    ) {
      showMessage(`只允许上传 ${formats.join(', ')}格式的文件`, 'error', 2000)
      return
    }

    if (files && files.length) {
      showMessage('成功上传！', 'success', 1000)
      // @ts-ignore
      props.onUpload(files)
    }
  }

  const handleDragEnter = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    e.target !== drag.current && setDragging(true)
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    e.target === drag.current && setDragging(false)
  }

  const showMessage = (text: any, type: any, timeout: any) => {
    setMessage({ show: true, text, type })
    setTimeout(() => setMessage({ show: false, text: null, type: null }), timeout)
  }

  return (
    <div ref={drop} className="FilesDragAndDrop">
      {message.show && (
        <div
          className={`FilesDragAndDrop__placeholder FilesDragAndDrop__placeholder--${message.type}`}
        >
          {message.text}
          <span role="img" aria-label="emoji" className="area__icon">
            {message.type === 'error' ? <>&#128546;</> : <>&#128536;</>}
          </span>
        </div>
      )}
      {dragging && (
        // @ts-ignore
        <div ref={drag} className="FilesDragAndDrop__placeholder">
          请放手
          <span role="img" aria-label="emoji" className="area__icon">
            &#128541;
          </span>
        </div>
      )}
      {props.children}
    </div>
  )
}

export default DragFileUpload
