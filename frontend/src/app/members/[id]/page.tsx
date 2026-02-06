import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

/**
 * Redirect route from /members/[id] to /member/profile/[id]
 * This maintains backward compatibility if old URLs are bookmarked
 */
export default async function MembersRedirect({ params }: Props) {
  const { id } = await params as { id: string };
  redirect(`/member/profile/${encodeURIComponent(id)}`);
}
