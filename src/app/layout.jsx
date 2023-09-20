import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import { Inter, Open_Sans, Roboto } from 'next/font/google';
import Footer from '@/components/footer/Footer';


const inter = Inter({ subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin']});

export const metadata = {
  title: 'Company Ltd. | Welcome',
  description: 'Welcome to Company Ltd., a boutique Creative Design Agency',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>        
      </body>
    </html>
  )
}
