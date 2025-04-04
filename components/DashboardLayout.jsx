import Link from 'next/link';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul>
          <li><Link href="/admin/users"><a className="block py-2">Users</a></Link></li>
          <li><Link href="/admin/messages"><a className="block py-2">Messages</a></Link></li>
          <li><Link href="/admin/properties"><a className="block py-2">Properties</a></Link></li>
          <li><Link href="/admin/bookmarks"><a className="block py-2">Bookmarks</a></Link></li>
          <li><Link href="/admin/profile"><a className="block py-2">Profile</a></Link></li>
        </ul>
      </div>
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
