import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/veiculos")({
  component: VehiclesLayout,
});

function VehiclesLayout() {
  return <Outlet />;
}
