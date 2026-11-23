export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">About Havenly</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        Havenly helps people find homes to buy and rent with clear, trustworthy listings.
      </p>
    </div>
  );
}
