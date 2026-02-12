import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-gray-800">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#11c3c0]">
        Terms & Conditions
      </h1>

      <p className="text-gray-600 text-center mb-12">
        Last updated: October 30, 2025
      </p>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          1. Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to <strong>Nomad Atlas</strong> — your guide to exploring the
          best destinations for remote work around the world. By accessing or
          using our website (the “Service”), you agree to comply with and be
          bound by these Terms and Conditions. Please read them carefully before
          using Nomad Atlas.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          2. Eligibility
        </h2>
        <p className="text-gray-700 leading-relaxed">
          To use Nomad Atlas, you must be at least 18 years old or have legal
          parental consent. By using this website, you confirm that you meet
          this requirement and that all information you provide is accurate and
          up to date.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          3. Use of Our Service
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Nomad Atlas provides curated data, reviews, and insights to help
          digital nomads and remote workers make informed travel and work
          decisions. You agree not to misuse the platform, upload false data, or
          engage in any activity that may disrupt or harm the Service or other
          users.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          4. User Content
        </h2>
        <p className="text-gray-700 leading-relaxed">
          You may share reviews, feedback, and destination experiences on Nomad
          Atlas. By submitting content, you grant us a non-exclusive,
          royalty-free, worldwide license to use, display, and distribute your
          content within the platform for promotional or informational purposes.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          5. Intellectual Property
        </h2>
        <p className="text-gray-700 leading-relaxed">
          All content on Nomad Atlas, including text, graphics, logos, images,
          and software, is owned or licensed by Nomad Atlas and protected under
          copyright and trademark laws. You may not reproduce, distribute, or
          modify any part of the site without our written permission.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          6. Third-Party Links
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Our website may contain links to external websites or services that
          are not operated by Nomad Atlas. We are not responsible for the
          content, privacy policies, or practices of third-party websites and
          encourage users to review their terms independently.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          7. Limitation of Liability
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Nomad Atlas strives to provide accurate and helpful information, but
          we make no guarantees regarding accuracy, reliability, or
          availability. We are not liable for any losses or damages resulting
          from your reliance on information from our website.
        </p>
      </section>

      {/* Section 8 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          8. Privacy Policy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Your privacy is important to us. Please review our{" "}
          <a
            href="/privacy-policy"
            className="text-[#11c3c0] hover:underline font-medium"
          >
            Privacy Policy
          </a>{" "}
          to understand how we collect, use, and protect your information.
        </p>
      </section>

      {/* Section 9 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          9. Changes to Terms
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Nomad Atlas reserves the right to update or modify these Terms at any
          time without prior notice. Continued use of the platform after such
          changes constitutes your acceptance of the new Terms.
        </p>
      </section>

      {/* Section 10 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          10. Contact Us
        </h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about these Terms, please contact our team
          at{" "}
          <a
            href="mailto:support@nomadatlas.com"
            className="text-[#11c3c0] hover:underline"
          >
            support@nomadatlas.com
          </a>
          .
        </p>
      </section>

      {/* Footer note */}
      <div className="text-center mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} Nomad Atlas. All rights reserved.
      </div>
    </div>
  );
};

export default TermsAndConditions;
