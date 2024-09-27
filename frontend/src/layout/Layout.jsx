import MainLayout from "./MainLayout.jsx";
import AdminLayout from "./AdminLayout.jsx";
import { isAdmin } from "../config/isAdmin.js";

export const Layout = isAdmin ? AdminLayout : MainLayout;
