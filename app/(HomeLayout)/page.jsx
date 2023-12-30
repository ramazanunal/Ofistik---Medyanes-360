import HomeContainer from '@/containers/Home';

export const metadata = {
  title: 'Ofistik || Hizmet Al - Hizmet Ver',
  description: 'İhtiyacınıza yönelik tüm işleri Ofistik üzerinden temin edin.',
};

export default function page() {
  return (
    <>
      <HomeContainer />
    </>
  );
}
