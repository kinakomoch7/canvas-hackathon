import Header from "@/components/common/Header";
import TokenPage from "@/components/tokenPage/TokenPage";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center w-[90]vw">
        <TokenPage />
      </div>
    </div>
  );
}
