
import { verifyAuth } from './auth'; // ✅ import the verifyAuth function

export function checkRole(req, allowedRoles) {
  const user = verifyAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.next();
}