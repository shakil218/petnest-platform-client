import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 export const metadata = {
  title: "PetNest - Your Trusted Pet Adoption Platform",
  description:
    "Discover loving homes for pets in need with PetNest. Browse adoptable pets, share heartwarming success stories, and access essential pet care tips. Join our community and make a difference in the lives of animals today.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="min-h-[calc(100vh-384.4px)]">{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
