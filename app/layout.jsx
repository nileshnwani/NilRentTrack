import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';
import 'photoswipe/dist/photoswipe.css';
import { AuthProvider } from '@/context/AuthContext';

import FeaturedProperties from '@/components/FeaturedProperties';
export const metadata = {
  title: 'NilRentTrack | Smart Rental Property Tracker',
  description: 'Effortlessly track your rental properties, due payments, and notifications in one place with NilRentTrack.',
  keywords: 'rental management, property tracking, real estate, rent due tracker, landlord tool, rental payments',
};


const MainLayout = ({ children }) => {
  return (
    <AuthProvider>

        <html lang='en'>
          <body>
            <Navbar />
            <FeaturedProperties></FeaturedProperties>
            <main>{children}</main>
            
            <Footer />
            <ToastContainer />
          </body>
        </html>

        </AuthProvider>
  );
};

export default MainLayout;
