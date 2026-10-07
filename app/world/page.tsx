"use client";

import { useEffect } from "react";

const worldConfig = {
	brand: { name: "Class Craft Ghana", href: "/" },
	diveScroll: 1.3,
	connScroll: 0.9,
	hint: "scroll to fly in",
	nav: true,
	atmosphere: true,
	sections: [
		{
			id: "fabrics",
			label: "Fabrics",
			still: "/images_v2/38.jpg",
			accent: "#60a5fa",
			eyebrow: "01 · School Fabrics",
			title: "Printed around your crest and colours.",
			body: "Custom printed school fabrics — your school's name, crest and pattern on every metre.",
			tags: ["Full pieces", "Custom print", "Bulk supply"],
		},
		{
			id: "uniforms",
			label: "Uniforms",
			still: "/images_v2/24.jpg",
			accent: "#34d399",
			eyebrow: "02 · Uniforms & Friday Wear",
			title: "One identity, worn every day.",
			body: "Coordinated uniforms and Friday wear for students and staff, cut and finished for school life.",
			tags: ["Day uniforms", "Friday wear", "Staff wear"],
		},
		{
			id: "badges",
			label: "Badges",
			still: "/images_v2/18.jpg",
			accent: "#f59e0b",
			eyebrow: "03 · Badges & Crests",
			title: "Details that carry your name.",
			body: "Embroidered, printed and patch-style badges and crests made to match your school artwork.",
			tags: ["Embroidered", "Printed", "Patches"],
		},
		{
			id: "supplies",
			label: "Supplies",
			still: "/images_v2/3.jpg",
			accent: "#a78bfa",
			eyebrow: "04 · Supplies & Branding",
			title: "Everything your school needs.",
			body: "Books, stationery, branded items and other identity materials — one supplier, delivered across Ghana.",
			tags: ["Exercise books", "Stationery", "Branding"],
			cta: {
				primary: { label: "Get a quote", href: "/#quote" },
				secondary: { label: "Back home", href: "/" },
			},
		},
	],
};

type ScrubEngineWindow = Window & {
	mountScrollWorld?: (
		container: HTMLElement,
		config: typeof worldConfig
	) => void;
};

export default function WorldPage() {
	useEffect(() => {
		const container = document.getElementById("world");
		if (!container || container.dataset.swMounted === "true") return;

		let disposed = false;
		const mount = () => {
			if (disposed || container.dataset.swMounted === "true") return;
			const api = (window as ScrubEngineWindow).mountScrollWorld;
			if (typeof api !== "function") return;
			container.dataset.swMounted = "true";
			api(container, worldConfig);
		};

		if (typeof (window as ScrubEngineWindow).mountScrollWorld === "function") {
			mount();
			return;
		}

		let script = document.querySelector<HTMLScriptElement>(
			'script[src="/scroll-world/scrub-engine.js"]'
		);
		if (!script) {
			script = document.createElement("script");
			script.src = "/scroll-world/scrub-engine.js";
			document.body.appendChild(script);
		}
		const pending = script;
		pending.addEventListener("load", mount);
		return () => {
			disposed = true;
			pending.removeEventListener("load", mount);
		};
	}, []);

	return (
		<main className="worldPage">
			<div id="world" />
		</main>
	);
}
