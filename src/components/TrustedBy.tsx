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
  { name: "OpenAI", logo: openaiLogo, invert: false },
  { name: "NVIDIA", logo: nvidiaLogo, invert: false },
  { name: "Scale", logo: scaleLogo, invert: false },
  { name: "Meta", logo: metaLogo, invert: true },
  { name: "Microsoft", logo: microsoftLogo, invert: false },
  { name: "Anthropic", logo: anthropicLogo, invert: true },
  { name: "Tesla", logo: teslaLogo, invert: false },
  { name: "AWS", logo: awsLogo, invert: false },
  { name: "Google", logo: googleLogo, invert: false },
];

const TrustedBy = () => {
  return (
    <section className="w-full py-12 bg-black border-t border-white/5">
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-light tracking-tight text-white/80">Leading by engineers from</span>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

        <div className="flex animate-marquee w-max gap-16 items-center">
          {[...companies, ...companies].map((company, i) => (
            <div
              key={`${company.name}-${i}`}
              className="flex items-center justify-center w-[120px] h-[48px] shrink-0"
            >
              <img
                src={company.logo}
                alt={company.name}
                className={`w-auto h-auto object-contain hover:scale-110 transition-transform duration-300 ${company.name === 'OpenAI' ? 'max-h-[36px] max-w-[100px]' : 'max-h-[48px] max-w-[120px]'} ${company.invert ? 'invert brightness-200' : ''}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
