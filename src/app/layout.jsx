import "./globals.css";

const geistSans = ({
  FontFace: 'Geist, sans-serif',
});

const geistMono = ({
  FontFace: 'Geist, sans-serif',
});

export const metadata = {
  title: "Tangent.Dev",
  description: "Made By BERMUDA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
