import type { RouteObject } from "react-router";
import { ButtonBase } from "./ButtonBase";

const ComponentRoutes: RouteObject[] = [
    {
        index: true,
        Component: ButtonBase
    },
    {
        path: 'button',
        Component: ButtonBase
    }
]

export default ComponentRoutes