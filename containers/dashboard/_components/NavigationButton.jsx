'use client'
import classNames from 'classnames';
import React from 'react';
import ChevronsRight from "@/assets/icons/ChevronsRight";

const NavigationButton = ({
  id,
  onClick,
  label,
  icon : Icon,
  active,
  level,
  onExpand,
  expanded,
  isChilds,
  child
}) => {

  const handleExpand = (
      event
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  return (
<div
    key={id}
    id={id}
    onClick={onClick}
      className={classNames(
        "flex items-center h-fit gap-4 rounded-lg py-3 relative px-4 text-sm font-medium",
        "cursor-pointer group",
        "transition-all duration-200 ease-in-out",
        active ? "!bg-secondary/20" : "bg-white hover:bg-trans-purple",
      )}
    >
      {Icon && <Icon className="stroke-gray" />}
      {label && label !== "" && <span className='text-nav-item'>{label}</span>}

  {isChilds && !!id && (
      <div
          role="button"
          className={
        classNames(
            "h-full transition-all duration-200 hover:bg-secondary/50 mr-1 p-1 rounded-xl ml-auto",
            expanded || active ? "rotate-90" : ""
        )
          }
          onClick={handleExpand}
      >
        <ChevronsRight
            className="h-4 w-4 shrink-0 text-muted-foreground/50"
        />
      </div>
  )}
    </div>
  );
};

export default NavigationButton;
