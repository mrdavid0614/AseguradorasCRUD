import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { AseguradoraForm } from "./pages/AseguradoraForm";
import { Layout } from "./common/components/Layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="newAseguradora" element={<AseguradoraForm mode="add" />} />
      <Route path="editAseguradora/:id" element={<AseguradoraForm mode="edit" />} />
    </Route>
  )
);