import "./SubjectLog.scss"

import Backward from "app/components/UI/Backward/Backward"
import { ReactNode } from "react"

interface SubjectLogProps {
  subject: ReactNode
  children: ReactNode
  onBackward?(): void
}
/**
 * 
 * Layout component mainly for `Details`
 */
function SubjectLog(props: SubjectLogProps) {
  return (
    <div className="subject-log">
      <Backward onClick={props.onBackward} />
      <div className="subject-log__container">
        <div className="subject-log__subject">
          {props.subject}
        </div>

        <div className="subject-log__log">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default SubjectLog
