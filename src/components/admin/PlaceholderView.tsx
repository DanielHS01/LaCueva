"use client";

type Props = {
  title: string;
};

export default function PlaceholderView({ title }: Props) {
  return (
    <div
      className="
        bg-[#161616]
        border border-white/5
        rounded-3xl
        p-20
        flex flex-col items-center justify-center
      "
    >
      <h2 className="text-3xl font-bold mb-4">{title}</h2>

      <p className="text-gray-400">Próximamente...</p>
    </div>
  );
}
