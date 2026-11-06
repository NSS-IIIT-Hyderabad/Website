
import type { Metadata } from "next";
import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MyBharat Volunteer Registration Guide | NSS IIITH",
  description:
    "Step-by-step instructions for registering as an NSS volunteer at IIIT Hyderabad through the MyBharat portal.",
};

type RegistrationStep = {
  number: number;
  title: string;
  description: string;
  screenshot?: {
    src: string;
    alt: string;
  };
  warning?: string;
};

const registrationSteps: RegistrationStep[] = [
  {
    number: 1,
    title: "Open the MyBharat portal",
    description:
      "Open the MyBharat registration page and click on Register. A popup will appear.",
    screenshot: {
      src: "/registration_images/NSS_Guide_Step_1.png",
      alt: "MyBharat registration popup",
    },
  },
  {
    number: 2,
    title: "Verify your mobile number",
    description:
      "Enter your mobile number and fill in the OTP you receive.",
  },
  {
    number: 3,
    title: "Enter your personal details",
    description:
      "Fill in the required details, including your name, date of birth and gender. Set up a password and follow the password policy while doing so.",
    screenshot: {
      src: "/registration_images/NSS_Guide_Step_3.png",
      alt: "MyBharat personal details form",
    },
  },
  {
    number: 4,
    title: "Enter your address details",
    description:
      "Fill in your address details, including your state, district and whether you are in a rural or urban area. Enter any additional details if asked.",
  },
  {
    number: 5,
    title: "Choose your youth type",
    description: "Choose NSS as your youth type.",
    screenshot: {
      src: "/registration_images/NSS_Guide_Step_5.png",
      alt: "MyBharat youth type selection showing NSS",
    },
  },
  {
    number: 6,
    title: "Complete the remaining registration details",
    description:
      "Fill in all the remaining details as shown. Choose your sports talent and then click on Submit.",
    screenshot: {
      src: "/registration_images/NSS_Guide_Step_6.png",
      alt: "MyBharat remaining registration details",
    },
    warning:
      "Do not choose to participate in Khelo India Talent Hunt. There is a technical issue with this option that will lead to failure of your registration.",
  },
  {
    number: 7,
    title: "Open your education qualification section",
    description:
      "You are now registered. Scroll down to your Education Qualification section and choose Modify.",
    screenshot: {
      src: "/registration_images/NSS_Guide_Step_7.png",
      alt: "MyBharat education qualification section",
    },
  },
  {
    number: 8,
    title: "Enter your college details",
    description:
      "Enter the details as shown, including your college roll number, and then save the entered details.",
    screenshot: {
      src: "/registration_images/NSS_Guide_Step_8.png",
      alt: "MyBharat college education details",
    },
  },
];

function RegistrationScreenshot({
  screenshot,
}: {
  screenshot: {
    src: string;
    alt: string;
  };
}) {
  return (
    <a
      href={screenshot.src}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open full-size image: ${screenshot.alt}`}
      className="group mt-5 block w-full cursor-zoom-in"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-50">
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          sizes="(max-width: 768px) calc(100vw - 5rem), (max-width: 1280px) calc(100vw - 7rem), 1200px"
          className="object-contain p-2 transition-transform duration-200 group-hover:scale-[1.01]"
        />
      </div>

      <p className="mt-2 text-right text-xs text-gray-500">
        Click to view full-size image
      </p>
    </a>
  );
}

export default function VolunteerRegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* Page Introduction */}
        <header className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
            NSS IIIT Hyderabad
          </p>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-gray-600 sm:text-5xl">
            MyBharat Volunteer Registration Guide
          </h1>

          <div className="mx-auto my-6 h-1 w-24 rounded-full bg-gray-300" />

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Follow the steps below to register on the MyBharat portal and
            complete your NSS IIITH volunteer details.
          </p>

          {/* MyBharat Registration Link */}
          <a
            href="https://mybharat.gov.in/yuva_register"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 font-semibold text-nss-primary transition-colors hover:text-gray-700 hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#332a67]"
          >
            Start registration on MyBharat
            <ExternalLink
              aria-hidden="true"
              className="h-4 w-4"
            />
          </a>
        </header>

        {/* Registration Timeline */}
        <section aria-labelledby="registration-steps-heading">
          <h2
            id="registration-steps-heading"
            className="mb-8 text-2xl font-semibold text-gray-800"
          >
            Registration steps
          </h2>

          <div className="relative">
            {/* Timeline Connecting Line */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-5 top-6 w-px bg-gray-300 sm:left-6"
            />

            <ol className="relative space-y-8">
              {registrationSteps.map((step) => (
                <li
                  key={step.number}
                  className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5"
                >
                  {/* Step Number */}
                  <span
                    aria-hidden="true"
                    className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-semibold text-gray-700 sm:h-12 sm:w-12"
                  >
                    {step.number}
                  </span>

                  {/* Step Instructions */}
                  <div className="min-w-0 border-b border-gray-200 pb-8">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                      {step.description}
                    </p>

                    {/* Important Warning */}
                    {step.warning && (
                      <aside
                        aria-label="Important registration warning"
                        className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
                      >
                        <div className="flex items-center gap-2 font-semibold">
                          <AlertTriangle
                            aria-hidden="true"
                            className="h-5 w-5 shrink-0"
                          />
                          Important
                        </div>

                        <p className="mt-2 leading-relaxed">
                          {step.warning}
                        </p>
                      </aside>
                    )}

                    {/* Full-width Registration Screenshot */}
                    {step.screenshot && (
                      <RegistrationScreenshot
                        screenshot={step.screenshot}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Registration Completion */}
        <section
          aria-labelledby="registration-complete-heading"
          className="mt-10 rounded-xl border border-green-200 bg-green-50 p-6"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2
              aria-hidden="true"
              className="h-6 w-6 shrink-0 text-green-700"
            />

            <h2
              id="registration-complete-heading"
              className="text-lg font-semibold text-gray-800"
            >
              Registration complete!
            </h2>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            You are now an NSS volunteer from IIITH.
          </p>
        </section>

      </div>
    </div>
  );
}
