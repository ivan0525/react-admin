import React, { FC } from 'react'
import { Icon } from 'antd'
import { withRouter } from 'react-router-dom'
export interface Iprops {
  [key: string]: any
}
const HeaderContent: FC = (props: Iprops) => {
  return <div>1</div>
}

export default withRouter(HeaderContent)
