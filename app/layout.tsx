import "./globals.css";
import { GameProvider } from "@/contexts/GameContext";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GameProvider>
          <main>{children}</main>
        </GameProvider>
      </body>
    </html>
  );
};

export default RootLayout;
