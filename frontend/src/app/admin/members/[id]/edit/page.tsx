import AdminMemberFormPage from "@/components/admin/AdminMemberFormPage";

type Params = {
  id: string;
};

export default async function AdminEditMemberPage({ params }: { params: Promise<Params> }) {
  const resolved = await params;
  return <AdminMemberFormPage mode="edit" memberEmail={decodeURIComponent(resolved.id)} />;
}
