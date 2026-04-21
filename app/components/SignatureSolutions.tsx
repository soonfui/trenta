
"use client";

export default function SignatureSolutions() {
  return (
    <section className="bg-[#e9e9e9] text-black px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">

        {/* TOP */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-black/50 mb-8">
            Signature Solutions
          </p>

          <h2 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.05] max-w-5xl mx-auto">
            Big plans deserve
            <br />
            the right partner.
          </h2>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto">

          {/* LEFT CARD */}
          <div className="bg-blue-600 text-white p-10 md:p-14 min-h-[760px] flex flex-col items-center text-center">
            
            {/* TAG */}
            <div className="mb-10">
              <span className="border border-white/30 rounded-full px-5 py-2 text-lg">
                🎤 Events
              </span>
            </div>

            {/* TITLE */}
            <h3 className="text-5xl md:text-6xl leading-[1.02] tracking-tight font-medium mb-10">
              Events that
              <br />
              people remember.
            </h3>

            {/* BUTTON */}
            <div className="mb-auto">
              <a
                href="https://wa.me/601111537996?text=Hi%20Trenta,%20I%20need%20an%20event%20solution."
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-black text-white rounded-full px-8 py-4 text-lg hover:scale-105 transition"
              >
                I need an event solution
              </a>
            </div>

            {/* LIST */}
            <div className="space-y-0 text-xl mt-16">
              <p className="text-center mb-6 text-white/90">
                Perfect for:
              </p>

              <div className="border-t border-white/20 py-5 text-center">
                Branding
              </div>

              <div className="border-t border-white/20 py-5 text-center">
                Social media campaigns
              </div>

              <div className="border-t border-white/20 py-5 text-center">
                PR Communication
              </div>

              <div className="border-t border-white/20 py-5 text-center border-b">
                Studio Production
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-lime-300 text-black p-10 md:p-14 min-h-[760px] flex flex-col items-center text-center">

            {/* TAG */}
            <div className="mb-10">
              <span className="border border-black/20 rounded-full px-5 py-2 text-lg">
                📣 Advertising
              </span>
            </div>

            {/* TITLE */}
            <h3 className="text-5xl md:text-6xl leading-[1.02] tracking-tight font-medium mb-10">
              Marketing that
              <br />
              gets attention.
            </h3>

            {/* BUTTON */}
            <div className="mb-auto">
              <a
                href="https://wa.me/601111537996?text=Hi%20Trenta,%20I%20need%20an%20event%20solution."
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-black text-white rounded-full px-8 py-4 text-lg hover:scale-105 transition"
              >
                I need marketing support
              </a>
            </div>

            {/* LIST */}
            <div className="space-y-0 text-xl mt-16">
              <p className="text-center mb-6 text-black/80">
                Perfect for:
              </p>

              <div className="border-t border-black/15 py-5 text-center">
                Brand awareness
              </div>

              <div className="border-t border-black/15 py-5 text-center">
                Social media campaigns
              </div>

              <div className="border-t border-black/15 py-5 text-center">
                Creative promotions
              </div>

              <div className="border-t border-black/15 py-5 text-center border-b">
                Content creation
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}