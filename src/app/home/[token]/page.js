import Header from "@/components/common/Header";
import CoursesPercentage from "@/components/homePage/CoursesPercentage";

export default function Home({ params }) {
  const { token } = params;

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center w-[90]vw">
        <div className="flex flex-col items-center">
          <CoursesPercentage token={token} />
        </div>
      </div>
    </div>
  );
}
