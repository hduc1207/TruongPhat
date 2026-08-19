interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-gray-500 text-sm md:text-base">{subtitle}</p>
      )}
      <div className="mt-3 mx-auto w-16 h-1 bg-amber-500 rounded-full" />
    </div>
  );
}
