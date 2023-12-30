import Header from '@/containers/Home/_components/header';
import Footer from '@/containers/Home/_components/footer';

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default DashboardLayout;
