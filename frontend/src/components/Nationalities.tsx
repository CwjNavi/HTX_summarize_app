import { Skeleton } from "./ui/skeleton";

interface NationalitiesProps {
  nationalities: string | null;
  isLoading: boolean;
}

export const Nationalities = ({ nationalities, isLoading }: NationalitiesProps) => {
  if (isLoading) return (
    <div>
      <h2 className="text-lg font-semibold">Nationalities</h2>
      <Skeleton className="bg-gray-400 h-8 w-3xl rounded-xl" />
    </div>
  )

  if (nationalities === null) return null;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Nationalities</h2>
      <p>{nationalities}</p>
    </div>
  );
};
