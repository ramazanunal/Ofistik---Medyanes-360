'use client'
import classNames from 'classnames'
import React from 'react'

const Button = ({
  icon: Icon = null,
  label = null,
  className = "",
  onClick = function () { },

}) => {
  return (
    <button onClick={() => onClick()} className={classNames(
      "flex items-center gap-5 justify-center rounded-lg",
      "cursor-pointer bg-trans-purple group",
      "transition-all duration-200 ease-in-out hover:bg-very-purple",
      className
    )}>
      {Icon && <Icon className="stroke-mid-purple duration-200 transition-all group-hover:stroke-white" />}
      {label && <span>{label}</span>}
    </button>
  )
}

export default Button