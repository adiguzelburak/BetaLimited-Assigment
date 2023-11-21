import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";

export const MyRouter = {
    HOME: "/",
};

export default createBrowserRouter([
    {
        path: MyRouter.HOME,
        element: <Home />,
    },
]);