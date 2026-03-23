// Brand image break — visual breathing room between hero and content sections
// No text, no stats. Centered image only.

import Image from "next/image";

export function BrandImageBreak() {
  return (
    <section className="bg-background-warm py-12">
      <div className="max-w-[600px] mx-auto px-6">
        <Image
          src="/images/brand/landpress-marketing-2.png"
          alt="Creator reviewing TikTok earnings analytics on phone"
          width={600}
          height={420}
          className="rounded-2xl object-contain mx-auto"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default BrandImageBreak;
