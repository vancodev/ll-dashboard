import "./globals.css";
import SideNav from "@/components/side-nav";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <SideNav />
        <main className="ml-64 p-6 w-full bg-gray-50 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
