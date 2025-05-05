import "./globals.css";
import ProgressBar from "./progressbar";

export const metadata = {
  title: "Waifu Gacha",
  description: "Waifu Gacha Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
