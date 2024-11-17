import { createLazyFileRoute } from "@tanstack/react-router";
import ProtectedRoute from "../../redux/slices/ProtectedRoute.js";

export const Route = createLazyFileRoute("/admin/")({
  component: () => (
    <ProtectedRoute allowedRoles={[1]}>
      <AdminDashboard />
    </ProtectedRoute>
  ),
});

function AdminDashboard() {
  return <div>halo</div>;
}

export default AdminDashboard;
