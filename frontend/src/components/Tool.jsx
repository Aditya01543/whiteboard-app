import React from 'react'
import { boardManager } from '../managers/boardManager'

const Tool = ({Icon, onClick, toolName}) => {
  return (
    <button onClick={onClick} className={`size-8 border-4 ${boardManager.getState().drawing || boardManager.getState().currentTool === toolName ? 'pointer-events-none' : 'pointer-events-auto hover:bg-amber-200'} ${boardManager.getState().currentTool === toolName ? 'bg-amber-200' : ''} border-transparent rounded-sm cursor-pointer`}>
        <Icon/>
    </button>
  )
}

export default Tool
