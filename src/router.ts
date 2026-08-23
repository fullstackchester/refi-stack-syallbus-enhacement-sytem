import { createBrowserRouter } from "react-router";
import Shell from "./shared/Shell";
import Faculty from "pages/Faculty/Faculty";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Showcase } from "./shared/Showcase";
import ComponentRoutes from "./components/routes";

const router = createBrowserRouter(
    [
        {
            path: "/login",
            Component: Login
        },
        {
            path: "/",
            Component: Shell,
            children: [
                {
                    index: true,
                    path: "reports",
                    Component: Dashboard
                },
                {
                    path: "faculty",
                    Component: Faculty
                },
                        {
            path: '/components',
            Component: Showcase,
            children: ComponentRoutes
        },
            ]
        },
        {

        }
    ]
)

export default router;