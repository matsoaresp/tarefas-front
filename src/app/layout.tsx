import '../styles/globals.css'

export const metadata = {
  title: "Gerenciador de Tarefas",
  description: "Sistema de login",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}