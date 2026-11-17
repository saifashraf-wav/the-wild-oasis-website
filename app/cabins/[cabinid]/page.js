import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";

import { getCabin, getCabins } from "@/app/_lib/data-service";

import { Suspense } from "react";

// Generate static routes for all cabins
export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({
    cabinid: String(cabin.id),
  }));
}

// Generate metadata for each cabin
export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinid);

  return {
    title: `Cabin ${cabin.name}`,
  };
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinid);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
