"use client"

import { File as FileIcon, Folder, FolderOpen } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "~/lib/utils"
import { ScrollArea } from "../ui/scroll-area"

export type FileTreeNode = {
	id: string
	name: string
	type: "folder" | "file"
	children?: FileTreeNode[]
}

export type FileTreeProps = {
	data: FileTreeNode[]
	className?: string
	defaultExpandedIds?: string[]
	selectedId?: string
	onSelect?: (node: FileTreeNode) => void
}

export function FileTree(props: FileTreeProps) {
	const {
		data,
		className,
		defaultExpandedIds = [],
		selectedId,
		onSelect
	} = props

	const [expanded, setExpanded] = useState<Set<string>>(
		() => new Set(defaultExpandedIds)
	)

	const toggle = useCallback((id: string) => {
		setExpanded((prev) => {
			const next = new Set(prev)
			if (next.has(id)) next.delete(id)
			else next.add(id)
			return next
		})
	}, [])

	return (
		<ScrollArea id="cms-file-tree" className={cn("h-full w-full", className)}>
			<div className="p-2">
				{data.map((node) => (
					<TreeRow
						key={node.id}
						node={node}
						depth={0}
						expanded={expanded}
						toggle={toggle}
						selectedId={selectedId}
						onSelect={onSelect}
					/>
				))}
			</div>
		</ScrollArea>
	)
}

type TreeRowProps = {
	node: FileTreeNode
	depth: number
	expanded: Set<string>
	toggle: (id: string) => void
	selectedId?: string
	onSelect?: (node: FileTreeNode) => void
}

function TreeRow(props: TreeRowProps) {
	const { node, depth, expanded, toggle, selectedId, onSelect } = props

	const isFolder = node.type === "folder"
	const isOpen = isFolder && expanded.has(node.id)
	const isSelected = selectedId === node.id
	const hasChildren = !!node.children?.length

	return (
		<div>
			<div
				className={cn(
					"group flex items-center gap-1.5 rounded-md px-2 py-1 text-md",
					"hover:bg-muted/60",
					isSelected && "bg-muted"
				)}
				style={{ paddingLeft: 10 + depth * 6 }}
			>
				<span className="ml-1 shrink-0 text-muted-foreground">
					{isFolder ? (
						isOpen ? (
							<FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
						) : (
							<Folder className="h-3.5 w-3.5 text-muted-foreground" />
						)
					) : (
						<FileIcon className="h-3.5 w-3.5 text-muted-foreground" />
					)}
				</span>

				<button
					type="button"
					className={cn(
						"flex-1 truncate text-left text-[13px]",
						"focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					)}
					onClick={() => {
						if (isFolder) toggle(node.id)
						onSelect?.(node)
					}}
				>
					{node.name}
				</button>
			</div>

			{isFolder && isOpen && hasChildren && (
				<div className="ml-3 border-l border-border/40 pl-3">
					{node.children!.map((child) => (
						<TreeRow
							key={child.id}
							node={child}
							depth={depth + 1}
							expanded={expanded}
							toggle={toggle}
							selectedId={selectedId}
							onSelect={onSelect}
						/>
					))}
				</div>
			)}
		</div>
	)
}
