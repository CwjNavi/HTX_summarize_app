interface NationalitiesProps {
  nationalities: string | null;
}

export const Nationalities = ({ nationalities }: NationalitiesProps) => {
  if (!nationalities) return null;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Nationalities</h2>
      <p>{nationalities}</p>
    </div>
  );
};
