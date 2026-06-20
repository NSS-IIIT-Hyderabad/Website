import AdminEventFormPage from "@/components/admin/AdminEventFormPage";
import { decodeAdminRouteParam } from "@/utils/adminRouteParam";

type Params = {
  id: string;
};

export default async function AdminEditEventPage({ params }: { params: Promise<Params> }) {
  const resolved = await params;
  const eventId = resolved.id.includes("~")
    ? decodeAdminRouteParam(resolved.id)
    : decodeURIComponent(resolved.id);

  return <AdminEventFormPage mode="edit" eventId={eventId} />;
}
