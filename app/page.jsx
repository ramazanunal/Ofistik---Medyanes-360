import Wrapper from "@/layout/Wrapper";
import Home from "@/app/Home/page";

export const metadata = {
  title: "Ofistik || Hizmet Al - Hizmet Ver",
  description: "İhtiyacınıza yönelik tüm işleri Ofistik üzerinden temin edin.",
};

export default function page() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}
