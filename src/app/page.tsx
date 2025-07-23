import Image from "next/image";
import MainLayout from "./layout/main-layout";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}
