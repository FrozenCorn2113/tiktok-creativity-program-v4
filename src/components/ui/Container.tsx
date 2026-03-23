import React from 'react'

const sizes = {
  default: 'max-w-[var(--container-max)]',
  narrow: 'max-w-[var(--container-narrow)]',
  wide: 'max-w-[80rem]',
} as const

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: keyof typeof sizes
}

export default function Container({
  children,
  size = 'default',
  className = '',
  ...props
}: ContainerProps) {
  return (
    <div
      className={`${sizes[size]} mx-auto w-full px-[var(--gutter)] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
