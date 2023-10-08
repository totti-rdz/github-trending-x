type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="min-h-screen">
     {children}
    </main>
  );
};

export default Layout;
