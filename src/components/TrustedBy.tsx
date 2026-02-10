import openaiLogo from "@/assets/logos/openai.png";
import nvidiaLogo from "@/assets/logos/nvidia.png";
import scaleLogo from "@/assets/logos/scale.png";
import metaLogo from "@/assets/logos/meta.png";
import microsoftLogo from "@/assets/logos/microsoft.png";
import anthropicLogo from "@/assets/logos/anthropic.png";
import teslaLogo from "@/assets/logos/tesla.png";
import awsLogo from "@/assets/logos/aws.png";
import googleLogo from "@/assets/logos/google.png";

const companies = [
  { name: "OpenAI", logo: openaiLogo },
  { name: "NVIDIA", logo: nvidiaLogo },
  { name: "Scale", logo: scaleLogo },
  { name: "Meta", logo: metaLogo },
  { name: "Microsoft", logo: microsoftLogo },
  { name: "Anthropic", logo: anthropicLogo },
  { name: "Tesla", logo: teslaLogo },
  { name: "AWS", logo: awsLogo },
  { name: "Google", logo: googleLogo },
];

const TrustedBy = () => {
  return (
    <section className="w-full py-12 bg-black border-t border-white/5">
      <p className="text-center text-sm font-light tracking-wide mb-8 animate-text-shimmer bg-[length:200%_100%] bg-clip-text text-transparent bg-gradient-to-r from-white/40 via-white via-white/40">
        Leading by engineers from
      </p>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

        <div className="flex animate-marquee w-max gap-16 items-center">
          {[...companies, ...companies].map((company, i) => (
            <img
              key={`${company.name}-${i}`}
              src={company.logo}
              alt={company.name}
              className="h-10 w-auto object-contain hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
