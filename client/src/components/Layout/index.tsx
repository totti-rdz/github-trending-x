import Footer from './components/Footer';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="h-full w-full flex-1">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
