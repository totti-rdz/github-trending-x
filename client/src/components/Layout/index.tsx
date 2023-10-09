import Footer from './components/Footer';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
      <div className="flex min-h-screen flex-col justify-between">
        <main className="h-full w-full flex-1">{children}</main>
        <Footer />
      </div>
  );
};

export default Layout;
