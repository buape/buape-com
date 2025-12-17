"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"relative overflow-auto [scrollbar-width:thin] [scrollbar-color:var(--scrollbar-thumb)_transparent]",
					className
				)}
				{...props}
			>
				{children}
			</div>
		)
	}
)
ScrollArea.displayName = "ScrollArea"
