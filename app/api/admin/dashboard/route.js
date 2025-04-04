import { checkRole } from '@/middleware/authorization';

export async function GET(req) {
  const authResult = checkRole(req, ['admin']);
  if (authResult instanceof NextResponse) return authResult; // Return error if not admin

  return NextResponse.json({ message: 'Welcome to Admin Dashboard' });
}
