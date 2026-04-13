import React, { Children } from 'react'

const IconBtn = ({
  text,
  onClick,
  children,
  disabled,
  outline=false,
  customClasses,
  type,
})=>{
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`  flex items-center gap-x-2 rounded-md px-5 py-2 font-semibold transition-all duration-200 
    ${outline
          ? "border border-yellow-50 text-white-50 bg-transparent"
          : "bg-yellow-500 text-richblack-900"
        }
    ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-95"}
    ${customClasses}`}
    >
      {children && <span className="flex items-center">{children}</span>}
      <span>{text}</span>
    </button>
  )
}

export default IconBtn
