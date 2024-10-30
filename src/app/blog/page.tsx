import { blog } from "~/lib/source"
import { BlogCard } from "./BlogCard"

export default function Page() {
	const posts = [...blog.getPages()].sort(
		(a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
	)
	console.log(posts)

	return (
		<main className="m-10 items-center flex flex-col gap-20">
			<header className="text-5xl">Blog</header>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
				{posts.map((post) => (
					<BlogCard
						key={post.slugs[0]}
						link={`/blog/${post.slugs.join("/")}`}
						{...post.data}
					/>
				))}
			</div>
		</main>
	)
}
