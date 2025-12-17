import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MeProfile() {
  const cookieStore = await cookies();
  const uid = cookieStore.get('uid')?.value ?? '';
  
  if (!uid) {
    redirect('/members');
  }
  
  // Redirect to the specific profile page
  redirect(`/me/profile/${uid}`);
}
