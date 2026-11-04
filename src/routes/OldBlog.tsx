import { useLoaderData } from "react-router"
import { ContentSection } from "~/components/home/Content"
import { getPosts, getStaff } from "~/lib/api"

export async function oldBlogLoader() {
	const [posts, staff] = await Promise.all([
		getPosts(),
		getStaff().catch(() => undefined)
	])
	return { posts, staff }
}

export default function OldBlog() {
	const { posts, staff } = useLoaderData() as Awaited<
		ReturnType<typeof oldBlogLoader>
	>
	return (
		<div className="pt-24">
			<ContentSection
				id="old-blog"
				title="Blog archive"
				description="Posts from the original CMS."
				cards={posts.map((post) => {
					const authorId =
						typeof post.author === "string" ? post.author : post.author.id
					const author = staff?.data.staff.find(
						(person) => person.id === authorId
					)
					return {
						name: post.title,
						body: post.description ?? "",
						link: `/old-blog/${post.slug}`,
						author: author
							? {
									name: author.username || author.id,
									avatarUrl: author.avatarUrl || "",
									date: new Date(post.publishedAt ?? post.createdAt)
								}
							: undefined
					}
				})}
			/>
		</div>
	)
}
