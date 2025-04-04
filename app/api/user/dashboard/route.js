export const dynamic = 'force-dynamic';

import { checkRole } from '@/middleware/authorization';

export async function GET(req) {
  const authResult = checkRole(req, ['user', 'admin']);
  if (authResult instanceof NextResponse) return authResult;

  return NextResponse.json({ message: 'Welcome to User Dashboard' });
}
