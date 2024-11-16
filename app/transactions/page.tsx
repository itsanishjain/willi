import BankingDashboard from "@/components/app/BankingDashboard";
import NFTPortfolio from "@/components/app/NFTPortfolio";
import TokenPortfolio from "@/components/app/TokenPortfolio";
import AuthWrapper from "@/components/app/AuthWrapper";

export default function Page() {
  return (
    <AuthWrapper>
      <>
        <BankingDashboard />
        <NFTPortfolio />
        <TokenPortfolio walletAddress="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" />
      </>
    </AuthWrapper>
  );
}
