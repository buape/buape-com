import { createRoot } from "react-dom/client"
import { createBrowserRouter, Outlet, redirect } from "react-router"
import { RouterProvider } from "react-router/dom"
import { AppLayout } from "~/App"
import BlogPost, { blogPostLoader } from "~/routes/BlogPost"
import BrandingPage from "~/routes/Branding"
import CmsPage, { cmsPageLoader } from "~/routes/CmsPage"
import DocketPage, { docketLoader } from "~/routes/DocketPage"
import Home, { homeLoader } from "~/routes/Home"
import NotFound from "~/routes/NotFound"
import OldBlog, { oldBlogLoader } from "~/routes/OldBlog"
import "~/styles/globals.css"

function Root() {
	return (
		<AppLayout>
			<Outlet />
		</AppLayout>
	)
}

const router = createBrowserRouter([
	{
		element: <Root />,
		errorElement: (
			<AppLayout>
				<NotFound />
			</AppLayout>
		),
		children: [
			{ path: "/", element: <Home />, loader: homeLoader },
			{ path: "/branding", element: <BrandingPage /> },
			{ path: "/blog", loader: () => redirect("/#blog") },
			{
				path: "/blog/:entrySlug",
				element: <DocketPage />,
				loader: docketLoader
			},
			{ path: "/old-blog", element: <OldBlog />, loader: oldBlogLoader },
			{
				path: "/old-blog/:slug",
				element: <BlogPost />,
				loader: blogPostLoader
			},
			{ path: "/old-pages/:slug", element: <CmsPage />, loader: cmsPageLoader },
			{
				path: "/docket/blog/:entrySlug",
				loader: ({ params }) =>
					redirect(`/blog/${encodeURIComponent(params.entrySlug ?? "")}`)
			},
			{
				path: "/privacy-policy",
				loader: () => redirect("/terms#5-privacy-policy")
			},
			{ path: "/:slug", element: <DocketPage />, loader: docketLoader },
			{ path: "*", element: <NotFound /> }
		]
	}
])

const root = document.getElementById("root")
if (!root) throw new Error("Failed to find root element")

createRoot(root).render(<RouterProvider router={router} />)
