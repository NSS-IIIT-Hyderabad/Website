import React from "react";

const coordinators = [
	{
		name: "Dr. Prasad Krishnan",
		title: "NSS Coordinator",
		email: "prasad.krishnan@iiit.ac.in",
		image: "https://www.iiit.ac.in/wp-content/uploads/2022/12/Prasad-Krishnan.jpg",
	},
	{
		name: "Dr. Chiranjeevi Yarra",
		title: "NSS Officer",
		email: "chiranjeevi.yarra@iiit.ac.in",
		image: "https://www.iiit.ac.in/wp-content/uploads/2022/12/Chiranjeevi-Yarra.jpg",
	},
];

export default function ProgramCoordinators() {
	return (
		<section className="bg-white px-6 py-16 lg:px-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-10 text-center">
					<h2 className="text-3xl font-bold text-gray-800 md:text-4xl">NSS Program Coordinators</h2>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{coordinators.map((coordinator) => (
						<article
							key={coordinator.email}
							className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
						>
							<div className="mx-auto mb-5 h-32 w-32 rounded-full bg-gradient-to-b from-[#FF9933] via-white to-[#138808] p-[2px]">
								<div className="h-full w-full overflow-hidden rounded-full bg-white">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={coordinator.image}
										alt={coordinator.name}
										className="h-full w-full object-cover"
									/>
								</div>
							</div>
							<h3 className="text-xl font-semibold text-gray-800">{coordinator.name}</h3>
							<p className="mt-2 text-base text-gray-600">{coordinator.title}</p>
							<a
								href={`mailto:${coordinator.email}`}
								className="mt-4 inline-block break-all text-sm text-gray-600 transition-colors hover:text-gray-900"
							>
								{coordinator.email}
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
