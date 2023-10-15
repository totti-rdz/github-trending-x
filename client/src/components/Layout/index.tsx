import Footer from './components/Footer';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto flex h-screen flex-col">
      <main className="flex-1 overflow-auto pt-5">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
