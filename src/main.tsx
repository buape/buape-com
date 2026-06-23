import { createRoot } from "react-dom/client"
import { createBrowserRouter, Outlet, redirect } from "react-router"
import { RouterProvider } from "react-router/dom"
import { AppLayout } from "~/App"
import BlogPost, { blogPostLoader } from "~/routes/BlogPost"
import BrandingPage from "~/routes/Branding"
import CmsPage, { cmsPageLoader } from "~/routes/CmsPage"
import Home, { homeLoader } from "~/routes/Home"
import NotFound from "~/routes/NotFound"
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
			{ path: "/blog/:slug", element: <BlogPost />, loader: blogPostLoader },
			{
				path: "/privacy-policy",
				loader: () => redirect("/terms#5-privacy-policy")
			},
			{ path: "/:slug", element: <CmsPage />, loader: cmsPageLoader },
			{ path: "*", element: <NotFound /> }
		]
	}
])

const root = document.getElementById("root")
if (!root) throw new Error("Failed to find root element")

createRoot(root).render(<RouterProvider router={router} />)
