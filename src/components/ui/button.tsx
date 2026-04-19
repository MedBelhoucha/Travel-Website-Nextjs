import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    if (asChild) {
      if (React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
          ref,
          className: `${className || ""} ${children.props.className || ""}`,
          ...props,
        })
      }
    }
    return (
      <button
        className={className}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
