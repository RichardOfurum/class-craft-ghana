"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Gallary from "../components/Gallary";
import {
	ArrowRight,
	Check,
	ChevronLeft,
	ChevronRight,
	Menu,
	MessageCircle,
	X,
} from "lucide-react";

const heroSlides = [
	{
		tag: "New term collection",
		title: "Everything your school needs, customized.",
		desc: "Fabrics, uniforms, Friday wear, jerseys, badges and event cloth — designed around your crest and colours.",
		img: "/images_v3/Anniversary%20Cloth.jpg",
		alt: "Anniversary Cloth",
	},
	{
		tag: "Uniforms & Friday wear",
		title: "One identity, worn every day.",
		desc: "Coordinated uniforms and Friday wear for students and staff, cut and finished for school life.",
		img: "/images_v3/Ceremonial%20Uniforms%20(01100).jpg",
		alt: "Ceremonial Uniforms",
	},
	{
		tag: "Badges & crests",
		title: "Details that carry your name.",
		desc: "Embroidered and printed badges, crests and patches made to match your school artwork.",
		img: "/images_v3/Badges%20(22).jpg",
		alt: "Badges",
	},
];

const featureCards = [
	{ img: "/images_v3/Tracksuits%20(555).jpg", title: "Tracksuits" },
	{ img: "/images_v3/School%20Uniforms_.jpg", title: "School Uniforms" },
	{ img: "/images_v3/Cloth%20(68).jpg", title: "Cloth" },
	{ img: "/images_v3/Crest%20(100).jpg", title: "Crest" },
];

const fabricTiles = [
	{ img: "/images_v3/School%20Cloth%20(_5).jpg", title: "School Cloth" },
	{ img: "/images_v3/Anniversary%20Cloth(009999).jpg", title: "Anniversary Cloth" },
	{ img: "/images_v3/Ceremonial%20Cloth%20(02223).jpg", title: "Ceremonial Cloth" },
	{ img: "/images_v3/Denim%20Customization%20.jpg", title: "Denim Customization" },
];

const products = [
	{
		title: "Woven",
		img: "/images_v3/Woven%20.jpg",
		text: "Custom woven fabrics designed around your school colours, name, crest and pattern.",
	},
	{
		title: "Vest",
		img: "/images_v3/Vest%20(0008).jpg",
		text: "School vests and coordinated outerwear for students and staff.",
	},
	{
		title: "Jackets",
		img: "/images_v3/Jackets%20(909777).jpg",
		text: "Customized jackets and warm layers for school activities and staff.",
	},
	{
		title: "Badges",
		img: "/images_v3/Badges%20(777).jpg",
		text: "Embroidered, printed and patch-style school badges and crests.",
	},
	{
		title: "Ceremonial Cloth",
		img: "/images_v3/Ceremonial%20Cloth%20(000887).jpg",
		text: "Custom cloth for anniversaries, celebrations and school events.",
	},
	{
		title: "Custom pens",
		img: "/images_v3/Custom%20pens%20(3).jpg",
		text: "Pens, stationery, branded items and other school identity materials.",
	},
];

const steps = [
	[
		"01",
		"Share your details",
		"Send your school logo, colours, preferred products and quantity.",
	],
	[
		"02",
		"Get a quotation",
		"We discuss specifications, quantities and pricing for your order.",
	],
	[
		"03",
		"Approve the design",
		"Confirm artwork, sizes, colours and finishing before production.",
	],
	[
		"04",
		"We produce & deliver",
		"Your customized order is produced and delivery is arranged.",
	],
];

const recommended = [
	{
		img: "/images_v3/Custom%20Badge_LG.jpg",
		title: "Custom Badge LG",
		price: "Request pricing",
	},
	{
		img: "/images_v3/Brooches%20(000008).jpg",
		title: "Brooches",
		price: "Request pricing",
	},
	{
		img: "/images_v3/Woven%20Crest%20.jpg",
		title: "Woven Crest",
		price: "Request pricing",
	},
	{
		img: "/images_v3/Keychain%20(00889).jpg",
		title: "Keychain",
		price: "Request pricing",
	},
	{
		img: "/images_v3/Charms%20Bag%20LoGo_.jpg",
		title: "Charms Bag LoGo",
		price: "Request pricing",
	},
	{
		img: "/images_v3/Holders%20(0444)_.jpg",
		title: "Holders",
		price: "Request pricing",
	},
	{
		img: "/images_v3/Custom%20Sweaters%20(55000).jpg",
		title: "Custom Sweaters",
		price: "Request pricing",
	},
	{
		img: "/images_v3/Belt%20(00777).jpg",
		title: "Belt",
		price: "Request pricing",
	},
];

const stories = [
	"Bulk Orders",
	"Design Support",
	"Crest & Colours",
	"Sizes & Fitting",
	"Delivery in Ghana",
];

export default function Home() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [tab, setTab] = useState(0);
	const [sent, setSent] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const recoRef = useRef<HTMLDivElement>(null);

	const goQuote = () => {
		const el = document.getElementById("quote");
		if (el) el.scrollIntoView({ behavior: "smooth" });
		setMenuOpen(false);
	};

	// Cinematic scroll progress bar
	useEffect(() => {
		const updateProgress = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
		};
		updateProgress();
		window.addEventListener("scroll", updateProgress, { passive: true });
		return () => window.removeEventListener("scroll", updateProgress);
	}, []);

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSent(true);
		window.setTimeout(() => setSent(false), 4500);
	};

	const slide = heroSlides[tab];

	const scrollReco = (dir: number) => {
		if (recoRef.current) {
			recoRef.current.scrollBy({ left: dir * 480, behavior: "smooth" });
		}
	};

	return (
		<main className="cinematic">
			<div
				className="scroll-progress"
				style={{ width: scrollProgress + "%" }}
			></div>
			<div className="topbar">
				<div className="wrap">
					<span>Suppliers for schools across Ghana</span>
					<span>WhatsApp: +233 533 759 759</span>
				</div>
			</div>

			<header className="header">
				<div className="wrap">
					<a className="brand" href="#top" aria-label="Class Craft Ghana home">
						<Image
							className="logoImg"
							src="/images_v3/Class%20Craft%20Ghana%20Logo.jpg"
							alt="Class Craft Ghana"
							width={44}
							height={44}
						/>
						<span className="brandText">
							<strong>Class Craft Ghana</strong>
							<small>Custom school identity</small>
						</span>
					</a>

					<button
						className="menuBtn"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-expanded={menuOpen}
						aria-label="Toggle navigation"
					>
						{menuOpen ? <X size={16} /> : <Menu size={16} />} Menu
					</button>

					<nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary">
						<a href="#collections" onClick={() => setMenuOpen(false)}>
							Collections
						</a>
						<a href="#products" onClick={() => setMenuOpen(false)}>
							Products
						</a>
						<a href="#gallery" onClick={() => setMenuOpen(false)}>
							Gallery
						</a>
						<a href="#how-it-works" onClick={() => setMenuOpen(false)}>
							How it works
						</a>
						<a href="#about" onClick={() => setMenuOpen(false)}>
							About
						</a>
						<Link href="/world" onClick={() => setMenuOpen(false)}>
							Our World
						</Link>
						<button className="btn btn-dark" onClick={goQuote}>
							Get a Quote
						</button>
					</nav>
				</div>
			</header>

			<div className="heroTabs">
				<div className="wrap" role="tablist" aria-label="Featured collections">
					{["New Term", "Uniforms", "Badges & Crests"].map((t, i) => (
						<button
							key={t}
							role="tab"
							aria-selected={tab === i}
							className={tab === i ? "tabBtn on" : "tabBtn"}
							onClick={() => setTab(i)}
						>
							{t}
						</button>
					))}
				</div>
			</div>

			<section className="kv" id="top">
				<div className="wrap">
					<div>
						<p className="kvSub">{slide.tag}</p>
						<h1>{slide.title}</h1>
						<p className="kvDesc">{slide.desc}</p>
						<div className="kvCtas">
							<button className="btn btn-ghost" onClick={goQuote}>
								Learn more
							</button>
							<button className="btn btn-dark" onClick={goQuote}>
								Request pricing <ArrowRight size={15} />
							</button>
						</div>
					</div>

					<div className="kvMedia">
						<Image
							src={slide.img}
							alt={slide.alt}
							width={900}
							height={620}
							priority
						/>
						<div className="kvDots" aria-label="Choose feature">
							{heroSlides.map((s, i) => (
								<button
									key={s.tag}
									aria-label={s.tag}
									className={tab === i ? "on" : ""}
									onClick={() => setTab(i)}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
			<section className="band" id="collections">
				<div className="wrap section">
					<div className="split">
						<div>
							<p className="eyebrow">Collections</p>
							<h2>One identity, every product.</h2>
						</div>
						<p>
							Match fabrics, uniforms, jerseys and badges in your school colours
							and crest.
						</p>
					</div>

					<div className="bandGrid">
						{fabricTiles.map((t) => (
							<a className="bandCard" href="#quote" key={t.title}>
								<Image src={t.img} alt={t.title} width={500} height={360} />
								<b>{t.title}</b>
							</a>
						))}
					</div>
				</div>
			</section>

			<section className="kvBand">
				<div className="wrap">
					<div>
						<p className="kvSub" style={{ color: "#fff" }}>
							Bespoke for schools
						</p>
						<h2>Designed around your crest and colours.</h2>
						<p>
							Send your logo and preferred products. We prepare artwork, confirm
							sizes and produce in bulk.
						</p>
						<div className="kvCtas">
							<button
								className="btn btn-ghost"
								style={{ color: "#fff" }}
								onClick={goQuote}
							>
								Learn more
							</button>
							<button className="btn btn-blue" onClick={goQuote}>
								Start an order
							</button>
						</div>
					</div>
					<Image
						src="/images_v3/Ceremonial%20cloth_.jpg"
						alt="Ceremonial cloth"
						width={800}
						height={560}
					/>
				</div>
			</section>

			<section className="section" id="products">
				<div className="wrap">
					<div className="split">
						<div>
							<p className="eyebrow">Our solutions</p>
							<h2>Built around your school.</h2>
						</div>
						<p>
							Choose individual products or talk to us about a complete school
							order.
						</p>
					</div>

					<div className="bandGrid">
						{products.map((p) => (
							<article className="bandCard" key={p.title}>
								<Image src={p.img} alt={p.title} width={500} height={360} />
								<b>{p.title}</b>
								<p className="fine" style={{ margin: "8px 0 12px" }}>
									{p.text}
								</p>
								<button className="btn btn-dark" onClick={goQuote}>
									Request pricing
								</button>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="section" id="recommended">
				<div className="wrap">
					<div className="recoHead">
						<h2>Recommended for schools</h2>
						<div className="recoNav">
							<button
								className="roundBtn"
								aria-label="Previous"
								onClick={() => scrollReco(-1)}
							>
								<ChevronLeft size={18} />
							</button>
							<button
								className="roundBtn"
								aria-label="Next"
								onClick={() => scrollReco(1)}
							>
								<ChevronRight size={18} />
							</button>
						</div>
					</div>

					<div className="recoRow" ref={recoRef}>
						{recommended.map((r) => (
							<article className="recoCard" key={r.title}>
								<Image src={r.img} alt={r.title} width={420} height={300} />
								<b>{r.title}</b>
								<span className="recoPrice">{r.price}</span>
								<div style={{ marginTop: 10 }}>
									<button className="btn btn-dark" onClick={goQuote}>
										Get quote
									</button>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<Gallary />

			<section className="section">
				<div className="wrap">
					<div className="split">
						<div>
							<p className="eyebrow">Explore</p>
							<h2>Help for every order.</h2>
						</div>
						<p>Guides for measurements, artwork, quantities and delivery.</p>
					</div>

					<div className="storyGrid">
						{stories.map((s) => (
							<a className="storyCard" href="#quote" key={s}>
								{s}
							</a>
						))}
					</div>
				</div>
			</section>

			<section
				className="section"
				id="how-it-works"
				style={{
					background: "var(--surface)",
					borderTop: "1px solid var(--line)",
					borderBottom: "1px solid var(--line)",
				}}
			>
				<div className="wrap">
					<div className="split">
						<div>
							<p className="eyebrow">How it works</p>
							<h2>Simple from start to finish.</h2>
						</div>
						<p>
							Designed to make bulk school orders easier to plan and approve.
						</p>
					</div>

					<div className="steps">
						{steps.map(([n, t, d]) => (
							<article className="stepCard" key={n}>
								<small>STEP {n}</small>
								<h3>{t}</h3>
								<p>{d}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="section aboutSection" id="about">
				<div className="wrap">
					<div className="aboutCard">
						<p className="eyebrow">About Class Craft Ghana</p>
						<h2>A practical partner for school identity.</h2>
						<p>
							We keep colours, logos and identity consistent across uniforms,
							events and everyday school life.
						</p>
					</div>

					<ul className="checkList">
						<li>
							<span className="checkIcon">
								<Check size={14} />
							</span>
							<span>
								One supplier, whole identity. Fabrics, uniforms, jerseys, badges
								and event cloth planned together.
							</span>
						</li>
						<li>
							<span className="checkIcon">
								<Check size={14} />
							</span>
							<span>
								Designed around your crest. Artwork checked with you before
								production.
							</span>
						</li>
						<li>
							<span className="checkIcon">
								<Check size={14} />
							</span>
							<span>
								Made for bulk orders. Clear quotations and Ghana-wide delivery.
							</span>
						</li>
					</ul>
				</div>
			</section>

			<section className="section quote" id="quote">
				<div className="wrap quoteBox">
					<div className="quoteHead">
						<p className="eyebrow">Lets work together</p>
						<h2>Tell us what your school needs.</h2>
						<p>
							Send your school name, products, estimated quantity and deadline.
						</p>
						<div className="contactMini">
							<div>
								<b>WhatsApp</b>
								<span>+233 533 759 759</span>
							</div>
							<div>
								<b>Email</b>
								<span>contact@classcraftghana.com</span>
							</div>
							<div>
								<b>Office</b>
								<span>Tema Community 18, Lartehami AVE, GT-341-2236</span>
							</div>
						</div>
					</div>

					<form className="form" onSubmit={submit}>
						<input required placeholder="Your name" autoComplete="name" />
						<input
							required
							placeholder="School / organization name"
							autoComplete="organization"
						/>
						<div className="formRow">
							<input
								required
								placeholder="Phone / WhatsApp"
								autoComplete="tel"
							/>
							<select defaultValue="" required>
								<option value="" disabled>
									What do you need?
								</option>
								{products.map((p) => (
									<option key={p.title}>{p.title}</option>
								))}
							</select>
						</div>
						<textarea
							required
							placeholder="Quantity, sizes, colours, deadline or other details"
							rows={4}
						/>
						<button
							className="btn btn-dark"
							style={{ width: "100%" }}
							type="submit"
						>
							{sent ? (
								<>
									<Check size={16} /> Request sent
								</>
							) : (
								<>
									Send Request on WhatsApp <ArrowRight size={16} />
								</>
							)}
						</button>
						{sent && (
							<p className="successMsg">
								Thanks — your request has been captured. We will follow up with
								you.
							</p>
						)}
					</form>
				</div>
			</section>

			<footer className="footer">
				<div className="wrap">
					<div>
						<div className="footerBrand">
							<Image
								className="logoImg"
								src="/images_v3/Class%20Craft%20Ghana%20Logo.jpg"
								alt="Class Craft Ghana"
								width={44}
								height={44}
							/>
							<strong>Class Craft Ghana</strong>
						</div>
						<p
							style={{
								margin: "8px 0 0",
								fontSize: 13,
								color: "var(--muted)",
								maxWidth: 380,
							}}
						>
							Custom school wear, fabrics, badges and school supplies in Ghana.
						</p>
						<p className="fine" style={{ marginTop: 12 }}>
							All products are customized around your school colours, crest and
							artwork.
						</p>
					</div>
					<div className="footerContact">
						Tema Community 18, Lartehami AVE, GT-341-2236
						<br />
						WhatsApp: +233 533 759 759
						<br />
						contact@classcraftghana.com
					</div>
				</div>
			</footer>

			<a
				className="fab"
				href="https://wa.me/233533759759"
				target="_blank"
				rel="noreferrer"
			>
				<MessageCircle size={16} /> WhatsApp
			</a>
		</main>
	);
}
