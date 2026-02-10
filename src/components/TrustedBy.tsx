const companies = [
  { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/white" },
  { name: "Apple", logo: "https://cdn.simpleicons.org/apple/white" },
  { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/white" },
  { name: "Scale", logo: "https://cdn.simpleicons.org/scale/white" },
  { name: "Microsoft", logo: "https://cdn.simpleicons.org/microsoft/white" },
  { name: "Capital One", logo: "https://cdn.simpleicons.org/capitalone/white" },
  { name: "Google", logo: "https://cdn.simpleicons.org/google/white" },
  { name: "NVIDIA", logo: "https://cdn.simpleicons.org/nvidia/white" },
  { name: "Tesla", logo: "https://cdn.simpleicons.org/tesla/white" },
  { name: "Meta", logo: "https://cdn.simpleicons.org/meta/white" },
];

const TrustedBy = () => {
  return (
    <section className="w-full py-12 bg-[hsl(222.2,84%,4.9%)] border-t border-white/5">
      <p className="text-center text-sm font-light tracking-wide text-white/40 mb-8">
        Built by engineers from
      </p>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[hsl(222.2,84%,4.9%)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[hsl(222.2,84%,4.9%)] to-transparent z-10" />

        <div className="flex animate-marquee w-max gap-16 items-center">
          {[...companies, ...companies].map((company, i) => (
            <img
              key={`${company.name}-${i}`}
              src={company.logo}
              alt={company.name}
              className="h-6 w-auto opacity-50 hover:opacity-80 transition-opacity duration-300"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
