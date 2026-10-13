"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import {
	Search,
	X,
	ChevronLeft,
	ChevronRight,
	Eye,
	ArrowRight,
	Sparkles,
	SlidersHorizontal,
	Maximize2,
} from "lucide-react";

export interface GalleryItem {
	id: number;
	src: string;
	title: string;
	category: "fabrics" | "uniforms" | "badges" | "sports" | "supplies";
	categoryLabel: string;
	tag: string;
	description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
	{
		id: 1,
		src: "/images_v2/1.jpg",
		title: "Class Craft Ghana Brand Identity",
		category: "supplies",
		categoryLabel: "Supplies & Branding",
		tag: "Official Identity",
		description:
			"Official emblem, branded materials, and custom school identity standards manufactured for schools across Ghana.",
	},
	{
		id: 2,
		src: "/images_v2/2.jpg",
		title: "Embroidered School Badges & Crests",
		category: "badges",
		categoryLabel: "Badges & Crests",
		tag: "Embroidered Crest",
		description:
			"High-density embroidery badges with crisp gold, navy and crimson thread designed for blazers, pocket wear, and shirts.",
	},
	{
		id: 3,
		src: "/images_v2/3.jpg",
		title: "Custom Branded Exercise Books",
		category: "supplies",
		categoryLabel: "Supplies & Branding",
		tag: "School Stationery",
		description:
			"Personalized exercise books with customized school cover artwork, crest, vision, school rules, and watermark.",
	},
	{
		id: 4,
		src: "/images_v2/4.jpg",
		title: "Classic Tailored School Uniform",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Day Uniform",
		description:
			"Comfortable, breathable, and durable everyday student uniform tailored to withstand everyday school activities.",
	},
	{
		id: 5,
		src: "/images_v2/5.jpg",
		title: "Signature Friday Pattern Fabric",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Friday Pattern",
		description:
			"Custom wax prints engineered around your institutional colours, crest, and distinctive Friday wear pattern.",
	},
	{
		id: 6,
		src: "/images_v2/6.jpg",
		title: "Custom Woven Checked Shirting",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Woven Shirting",
		description:
			"Fine cotton-blend shirting material dyed to precision colour specifications for crisp student shirts.",
	},
	{
		id: 7,
		src: "/images_v2/7.jpg",
		title: "Executive Prefect & Staff Blazer",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Formal Blazer",
		description:
			"Tailored ceremonial blazers with custom embroidered chest crest, brass buttons, and reinforced shoulder lines.",
	},
	{
		id: 8,
		src: "/images_v2/8.jpg",
		title: "Coordinated School Uniform Ensemble",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Full Uniform Set",
		description:
			"Complete coordinated uniform sets for boys and girls ensuring uniform visual identity across all classes.",
	},
	{
		id: 9,
		src: "/images_v2/9.jpg",
		title: "Tailored School Pinafore & Blouse",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Girls Pinafore",
		description:
			"Pleated pinafore with matching short-sleeve blouse made from fade-resistant fabric with neat double stitching.",
	},
	{
		id: 10,
		src: "/images_v2/10.jpg",
		title: "Official Custom Printed Fabric Yardage",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Custom Yardage",
		description:
			"All-over repeating school crest and decorative motif printed on durable cotton fabric for institutional supply.",
	},
	{
		id: 11,
		src: "/images_v2/11.jpg",
		title: "Precision Metallic Thread Crest",
		category: "badges",
		categoryLabel: "Badges & Crests",
		tag: "Metallic Thread",
		description:
			"Gold and silver thread embroidery capturing intricate heraldic crests for leadership blazers and anniversaries.",
	},
	{
		id: 12,
		src: "/images_v2/12.jpg",
		title: "School Identity Accessories & Packs",
		category: "supplies",
		categoryLabel: "Supplies & Branding",
		tag: "Identity Pack",
		description:
			"Coordinated school accessories including badges, book covers, and identity wear packaged for term admissions.",
	},
	{
		id: 13,
		src: "/images_v2/13.jpg",
		title: "Inter-House Sports Jersey",
		category: "sports",
		categoryLabel: "Jerseys & Sports",
		tag: "House Jersey",
		description:
			"Lightweight, moisture-wicking inter-house sports jersey with custom house colours, crest, and player numbering.",
	},
	{
		id: 14,
		src: "/images_v2/14.jpg",
		title: "Commemorative Anniversary Cloth",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Anniversary Cloth",
		description:
			"Special-edition celebration cloth designed for school milestones, speech and prize-giving day, and homecomings.",
	},
	{
		id: 15,
		src: "/images_v2/15.jpg",
		title: "House Sports Jersey & PE Kit Set",
		category: "sports",
		categoryLabel: "Jerseys & Sports",
		tag: "PE Kit Set",
		description:
			"Durable athletic shorts and jersey combination tailored for physical education, tournaments, and sports day.",
	},
	{
		id: 16,
		src: "/images_v2/16.jpg",
		title: "Junior High School Uniform Set",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "JHS Uniform",
		description:
			"Standardized JHS student attire tailored with contrast collars, embroidered pocket badges, and reinforced hems.",
	},
	{
		id: 17,
		src: "/images_v2/17.jpg",
		title: "Senior High School Uniform",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "SHS Uniform",
		description:
			"Senior high uniform cuts tailored for older students with durable easy-iron shirting and structured skirts/pants.",
	},
	{
		id: 18,
		src: "/images_v2/18.jpg",
		title: "Embossed & Woven School Badges",
		category: "badges",
		categoryLabel: "Badges & Crests",
		tag: "Woven Badge",
		description:
			"Heat-sealable and sew-on school crests created with razor-sharp borders and authentic colour accuracy.",
	},
	{
		id: 19,
		src: "/images_v2/19.jpg",
		title: "Tailored Trousers & Short-Sleeve Uniform",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Boys Uniform",
		description:
			"Smart short-sleeve collared shirt paired with pleated boys trousers, fitted for daily comfort.",
	},
	{
		id: 20,
		src: "/images_v2/20.jpg",
		title: "Custom School Cardigan & Knitwear",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Knitwear",
		description:
			"Premium soft-knit sweaters and V-neck cardigans complete with school colour trim and chest crest.",
	},
	{
		id: 21,
		src: "/images_v2/21.jpg",
		title: "Full Piece Printed School Fabric",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Full Piece Roll",
		description:
			"12-yard full piece cloth rolls printed with exceptional dye penetration and colour fastness.",
	},
	{
		id: 22,
		src: "/images_v2/22.jpg",
		title: "High-Density Crest Embroidery",
		category: "badges",
		categoryLabel: "Badges & Crests",
		tag: "High Density",
		description:
			"Ultra-tight stitch count ensuring every word of the school motto and intricate emblems stay clearly legible.",
	},
	{
		id: 23,
		src: "/images_v2/23.jpg",
		title: "Staff Friday Fabric & Wax Print",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Staff Friday",
		description:
			"Distinctive Friday wear fabric dedicated for headmasters, teaching staff, and administrators.",
	},
	{
		id: 24,
		src: "/images_v2/24.jpg",
		title: "Complete Student Uniform Ensemble",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Day Uniform",
		description:
			"Bulk manufactured student uniforms offering strict consistency in fabric weight, colour shade, and stitching.",
	},
	{
		id: 25,
		src: "/images_v2/25.jpg",
		title: "Custom School Polo Shirts",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "School Polo",
		description:
			"Heavyweight pique cotton polo shirts embroidered with the school emblem for casual days and clubs.",
	},
	{
		id: 26,
		src: "/images_v2/26.jpg",
		title: "Multi-Colour Crest Pattern Cloth",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Multi-Colour Print",
		description:
			"Multi-tone institutional fabric print designed for both student day wear and staff dressmaking.",
	},
	{
		id: 27,
		src: "/images_v2/27.jpg",
		title: "Heritage School Fabric Print",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Heritage Print",
		description:
			"Rich Ghanaian motifs intertwined with institutional history, printed onto premium cotton yardage.",
	},
	{
		id: 28,
		src: "/images_v2/28.jpg",
		title: "Vibrant School Identity Cloth",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Identity Cloth",
		description:
			"Bespoke school cloth crafted with brilliant dye shades to give students a proud, instantly recognizable presence.",
	},
	{
		id: 29,
		src: "/images_v2/29.jpg",
		title: "Staff Ceremonial Yardage Print",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Ceremonial Yardage",
		description:
			"Custom textile manufactured to strict quality specs for school ceremonies, PTA events, and council gatherings.",
	},
	{
		id: 30,
		src: "/images_v2/30.jpg",
		title: "Pre-School & Kindergarten Uniform",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Early Years",
		description:
			"Gentle, flexible fabrics tailored specifically for nursery and kindergarten students with easy-wear fasteners.",
	},
	{
		id: 31,
		src: "/images_v2/31.jpg",
		title: "Primary School Checked Dress",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Girls Dress",
		description:
			"Timeless checkered school dress with bright contrast collar, deep side pockets, and durable waist tie.",
	},
	{
		id: 32,
		src: "/images_v2/32.jpg",
		title: "Tailored Staff Friday Wear",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Staff Friday Wear",
		description:
			"Bespoke sewn African print outfits for school leadership, department heads, and faculty members.",
	},
	{
		id: 33,
		src: "/images_v2/33.jpg",
		title: "Official Event & Speech Day Cloth",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Speech Day Cloth",
		description:
			"Commemorative speech day fabric designed with the official year banner and school achievement milestones.",
	},
	{
		id: 34,
		src: "/images_v2/34.jpg",
		title: "Modern Geometric School Textile",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Geometric Cloth",
		description:
			"Contemporary pattern blending mathematical geometry with the school emblem for a modern academic look.",
	},
	{
		id: 35,
		src: "/images_v2/35.jpg",
		title: "Inter-House Athletics Vest & Shorts",
		category: "sports",
		categoryLabel: "Jerseys & Sports",
		tag: "Track & Field",
		description:
			"Lightweight track and field athletic uniform kit engineered for maximum mobility under Ghanaian sun.",
	},
	{
		id: 36,
		src: "/images_v2/36.jpg",
		title: "School Sports Tracksuit & Warmup Set",
		category: "sports",
		categoryLabel: "Jerseys & Sports",
		tag: "Sports Tracksuit",
		description:
			"Zipped athletic track jacket and matching track pants custom-branded with crest and school stripe detailing.",
	},
	{
		id: 37,
		src: "/images_v2/37.jpg",
		title: "Smart Senior Uniform Separates",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Senior Separates",
		description:
			"Button-down short-sleeve shirts and tailored pleated skirts crafted for senior prefects and graduating classes.",
	},
	{
		id: 38,
		src: "/images_v2/38.jpg",
		title: "Custom School Fabric (Full Piece)",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Signature Piece",
		description:
			"The premier Class Craft Ghana customized fabric roll, woven and printed to the highest institutional standards.",
	},
	{
		id: 39,
		src: "/images_v2/39.jpg",
		title: "New Term Collection Fabric",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "New Term Cloth",
		description:
			"Flagship fabric for new academic sessions, ready for bulk dispatch to schools and certified uniform vendors.",
	},
	{
		id: 40,
		src: "/images_v2/40.jpg",
		title: "Custom Branded School Ties & Epaulettes",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Accessories",
		description:
			"Woven jacquard school neckties, prefect sashes, and shoulder epaulettes woven with school stripes and initials.",
	},
	{
		id: 41,
		src: "/images_v2/41.jpg",
		title: "Bespoke Kindergarten Playwear",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Kindergarten",
		description:
			"Durable playwear and apron sets designed to keep younger students clean, comfortable, and recognizable.",
	},
	{
		id: 42,
		src: "/images_v2/42.jpg",
		title: "Branded School Backpacks & Kits",
		category: "supplies",
		categoryLabel: "Supplies & Branding",
		tag: "School Bags",
		description:
			"Rugged, water-resistant school bags embroidered with the school crest and student name tags.",
	},
	{
		id: 43,
		src: "/images_v2/43.jpg",
		title: "Premium Custom Pattern School Cloth",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Custom Pattern",
		description:
			"Distinctive school cloth with geometric border details, crest repeats, and rich indigo/navy contrast.",
	},
	{
		id: 44,
		src: "/images_v2/44.jpg",
		title: "Traditional Ghanaian Motif School Textile",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Motif Cloth",
		description:
			"Authentic motif textile designed to elevate cultural heritage within the school's formal identity program.",
	},
	{
		id: 45,
		src: "/images_v2/45.jpg",
		title: "Official Institutional Cloth Roll",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Cloth Roll",
		description:
			"Heavy-duty factory roll ready for distribution to school tailors and PTA seamstresses across all regions.",
	},
	{
		id: 46,
		src: "/images_v2/46.jpg",
		title: "Metallic Thread Crest Embroidery",
		category: "badges",
		categoryLabel: "Badges & Crests",
		tag: "Crest Embroidery",
		description:
			"Metallic thread embroidery on rich twill backing, cut clean with heat-sealed borders for long-lasting wear.",
	},
	{
		id: 47,
		src: "/images_v2/47.jpg",
		title: "Coordinated House & Class Wear",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Class Uniform",
		description:
			"Matching sets designed with colour-coded epaulettes and piping to distinguish academic classes and houses.",
	},
	{
		id: 48,
		src: "/images_v2/48.jpg",
		title: "Fine Stitch Woven School Patches",
		category: "badges",
		categoryLabel: "Badges & Crests",
		tag: "Woven Patch",
		description:
			"Precision-woven school crest patches designed for straightforward sewing onto blazers, shirts, and bags.",
	},
	{
		id: 49,
		src: "/images_v2/49.jpg",
		title: "Custom School Polo & Collared Shirt",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Polo Shirt",
		description:
			"Breathable pique knit polo shirt featuring custom tipped collar, placket buttons, and chest logo embroidery.",
	},
	{
		id: 50,
		src: "/images_v2/50.jpg",
		title: "Colour-Matched School Cloth Roll",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Matched Yardage",
		description:
			"Guaranteed colour uniformity across multiple print batches, preserving institutional colour brand integrity.",
	},
	{
		id: 51,
		src: "/images_v2/51.jpg",
		title: "Bespoke Staff & Teacher Friday Wear",
		category: "uniforms",
		categoryLabel: "Uniforms & Wear",
		tag: "Teacher Friday Wear",
		description:
			"Refined African print corporate shirts and dresses tailored for teachers and academic staff.",
	},
	{
		id: 52,
		src: "/images_v2/52.jpg",
		title: "Complete School Identity Showcase",
		category: "fabrics",
		categoryLabel: "Fabrics & Prints",
		tag: "Identity Showcase",
		description:
			"Comprehensive collection showing fabrics, uniforms, and embroidery designed in unison for prestigious schools.",
	},
];

type CategoryKey =
	| "all"
	| "fabrics"
	| "uniforms"
	| "badges"
	| "sports"
	| "supplies";

interface CategoryTab {
	key: CategoryKey;
	label: string;
	count: number;
}

const INITIAL_VISIBLE_COUNT = 16;
const LOAD_MORE_INCREMENT = 12;

export default function Gallary() {
	const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	// Calculate counts per category
	const categories: CategoryTab[] = useMemo(() => {
		const counts: Record<CategoryKey, number> = {
			all: GALLERY_ITEMS.length,
			fabrics: 0,
			uniforms: 0,
			badges: 0,
			sports: 0,
			supplies: 0,
		};

		GALLERY_ITEMS.forEach((item) => {
			if (counts[item.category] !== undefined) {
				counts[item.category]++;
			}
		});

		return [
			{ key: "all", label: "All Works", count: counts.all },
			{ key: "fabrics", label: "Fabrics & Prints", count: counts.fabrics },
			{ key: "uniforms", label: "Uniforms & Wear", count: counts.uniforms },
			{ key: "badges", label: "Badges & Crests", count: counts.badges },
			{ key: "sports", label: "Jerseys & Sports", count: counts.sports },
			{ key: "supplies", label: "Supplies & Branding", count: counts.supplies },
		];
	}, []);

	// Filter items based on active category and search
	const filteredItems = useMemo(() => {
		let list = GALLERY_ITEMS;

		if (activeCategory !== "all") {
			list = list.filter((item) => item.category === activeCategory);
		}

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase().trim();
			list = list.filter(
				(item) =>
					item.title.toLowerCase().includes(q) ||
					item.tag.toLowerCase().includes(q) ||
					item.categoryLabel.toLowerCase().includes(q) ||
					item.description.toLowerCase().includes(q) ||
					String(item.id) === q
			);
		}

		return list;
	}, [activeCategory, searchQuery]);

	// Visible slice
	const displayedItems = useMemo(() => {
		// If searching or category has fewer than visibleCount, show all filtered
		if (searchQuery.trim()) {
			return filteredItems;
		}
		return filteredItems.slice(0, visibleCount);
	}, [filteredItems, visibleCount, searchQuery]);

	const hasMore = displayedItems.length < filteredItems.length;

	const handleLoadMore = () => {
		setVisibleCount((prev) =>
			Math.min(prev + LOAD_MORE_INCREMENT, filteredItems.length)
		);
	};

	const handleShowAll = () => {
		setVisibleCount(filteredItems.length);
	};

	const handleCategoryChange = (key: CategoryKey) => {
		setActiveCategory(key);
		setVisibleCount(INITIAL_VISIBLE_COUNT);
	};

	// Lightbox navigation
	const activeLightboxItem =
		lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

	const openLightbox = (index: number) => {
		setLightboxIndex(index);
	};

	const closeLightbox = useCallback(() => {
		setLightboxIndex(null);
	}, []);

	const goPrev = useCallback(() => {
		if (lightboxIndex === null) return;
		setLightboxIndex((prev) =>
			prev !== null
				? (prev - 1 + filteredItems.length) % filteredItems.length
				: 0
		);
	}, [lightboxIndex, filteredItems.length]);

	const goNext = useCallback(() => {
		if (lightboxIndex === null) return;
		setLightboxIndex((prev) =>
			prev !== null ? (prev + 1) % filteredItems.length : 0
		);
	}, [lightboxIndex, filteredItems.length]);

	// Keyboard listener for lightbox
	useEffect(() => {
		if (lightboxIndex === null) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeLightbox();
			} else if (e.key === "ArrowLeft") {
				goPrev();
			} else if (e.key === "ArrowRight") {
				goNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = originalOverflow;
		};
	}, [lightboxIndex, closeLightbox, goPrev, goNext]);

	const scrollToQuote = (itemTitle?: string) => {
		closeLightbox();
		const el = document.getElementById("quote");
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
			if (itemTitle) {
				const textarea = el.querySelector<HTMLTextAreaElement>("textarea");
				if (textarea && !textarea.value) {
					textarea.value = `Hello, I am inquiring about the design: "${itemTitle}". Please share pricing and minimum order quantities.`;
				}
			}
		}
	};

	return (
		<section className="gallerySection" id="gallery">
			<div className="wrap">
				{/* Section Header */}
				<div className="galleryHeader">
					<div className="galleryHeaderTop">
						<div>
							<p className="eyebrow">Visual Portfolio</p>
							<h2>Custom School Gallery</h2>
							<p>
								Browse our complete showcase of {GALLERY_ITEMS.length} custom
								school identity works — fabrics, sewn uniforms, Friday wear, sports
								jerseys, and precision badges supplied across Ghana.
							</p>
						</div>

						{/* Quick Quote trigger */}
						<button
							className="btn btn-blue"
							onClick={() => scrollToQuote()}
						>
							Request Custom Design <ArrowRight size={15} />
						</button>
					</div>

					{/* Category Tabs & Search Bar */}
					<div className="galleryControls">
						<div className="galleryTabsRow">
							<div
								className="galleryTabs"
								role="tablist"
								aria-label="Gallery Categories"
							>
								{categories.map((cat) => {
									const isActive = activeCategory === cat.key;
									return (
										<button
											key={cat.key}
											role="tab"
											aria-selected={isActive}
											className={`galleryTabBtn ${isActive ? "active" : ""}`}
											onClick={() => handleCategoryChange(cat.key)}
										>
											{cat.key === "all" && <Sparkles size={13} />}
											{cat.label}
											<span className="galleryTabCount">{cat.count}</span>
										</button>
									);
								})}
							</div>

							{/* Search Box */}
							<div className="gallerySearchBox">
								<Search size={15} className="gallerySearchIcon" />
								<input
									type="text"
									className="gallerySearchInput"
									placeholder="Search gallery (e.g. badge, fabric, jersey)..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									aria-label="Search gallery items"
								/>
								{searchQuery && (
									<button
										className="gallerySearchClear"
										onClick={() => setSearchQuery("")}
										aria-label="Clear search"
									>
										<X size={13} />
									</button>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Gallery Grid */}
				{filteredItems.length === 0 ? (
					<div className="galleryEmptyState">
						<SlidersHorizontal
							size={36}
							style={{ opacity: 0.5, marginBottom: 12 }}
						/>
						<h3>No matching designs found</h3>
						<p>
							We couldn&apos;t find any items matching &ldquo;{searchQuery}&rdquo;.
							Try another search term or select a different category.
						</p>
						<button
							className="btn btn-dark"
							style={{ marginTop: 16 }}
							onClick={() => {
								setSearchQuery("");
								setActiveCategory("all");
							}}
						>
							Reset Filters
						</button>
					</div>
				) : (
					<>
						<div className="galleryGrid">
							{displayedItems.map((item, idx) => (
								<article
									key={item.id}
									className="galleryCard"
									onClick={() => openLightbox(idx)}
									tabIndex={0}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											openLightbox(idx);
										}
									}}
									aria-label={`View ${item.title}`}
								>
									<div className="galleryCardMedia">
										<span className="galleryCardTag">{item.tag}</span>
										<Image
											src={item.src}
											alt={item.title}
											width={480}
											height={360}
											loading={idx < 8 ? "eager" : "lazy"}
											priority={idx < 4}
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
										/>
										<div className="galleryCardOverlay">
											<div className="galleryCardZoomBtn" title="Enlarge image">
												<Maximize2 size={16} />
											</div>
										</div>
									</div>

									<div className="galleryCardInfo">
										<span className="galleryCardCategory">
											{item.categoryLabel}
										</span>
										<h3 className="galleryCardTitle">{item.title}</h3>

										<div className="galleryCardFooter">
											<span className="galleryCardNumber">#{item.id}</span>
											<span className="galleryCardAction">
												View details <ArrowRight size={13} />
											</span>
										</div>
									</div>
								</article>
							))}
						</div>

						{/* Load More / Expand Controls */}
						{hasMore && !searchQuery && (
							<div className="galleryPagination">
								<p className="galleryPaginationText">
									Showing {displayedItems.length} of {filteredItems.length}{" "}
									designs in this category
								</p>
								<div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
									<button className="btn btn-light" onClick={handleLoadMore}>
										Load More ({Math.min(LOAD_MORE_INCREMENT, filteredItems.length - displayedItems.length)} more)
									</button>
									<button className="btn btn-blue" onClick={handleShowAll}>
										Show All ({filteredItems.length})
									</button>
								</div>
							</div>
						)}
					</>
				)}
			</div>

			{/* Lightbox Modal */}
			{activeLightboxItem && lightboxIndex !== null && (
				<div
					className="lightboxBackdrop"
					onClick={closeLightbox}
					role="dialog"
					aria-modal="true"
					aria-label={activeLightboxItem.title}
				>
					<div
						className="lightboxModal"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Top Bar */}
						<div className="lightboxTopBar">
							<div className="lightboxCounter">
								<Sparkles size={14} style={{ color: "#60a5fa" }} />
								<span>
									Design {lightboxIndex + 1} of {filteredItems.length}
								</span>
							</div>

							<button
								className="lightboxCloseBtn"
								onClick={closeLightbox}
								aria-label="Close image modal (Esc)"
							>
								<X size={18} />
							</button>
						</div>

						{/* View Area with Nav Buttons */}
						<div className="lightboxViewArea">
							{filteredItems.length > 1 && (
								<button
									className="lightboxNavBtn lightboxNavPrev"
									onClick={goPrev}
									aria-label="Previous image"
								>
									<ChevronLeft size={22} />
								</button>
							)}

							<div className="lightboxImageWrap">
								<Image
									src={activeLightboxItem.src}
									alt={activeLightboxItem.title}
									width={960}
									height={680}
									priority
									sizes="(max-width: 1024px) 95vw, 900px"
								/>
							</div>

							{filteredItems.length > 1 && (
								<button
									className="lightboxNavBtn lightboxNavNext"
									onClick={goNext}
									aria-label="Next image"
								>
									<ChevronRight size={22} />
								</button>
							)}
						</div>

						{/* Bottom Metadata & Actions */}
						<div className="lightboxBottomBar">
							<div className="lightboxMeta">
								<div className="lightboxMetaTop">
									<span className="lightboxMetaCategory">
										{activeLightboxItem.categoryLabel}
									</span>
									<span className="lightboxMetaTag">
										{activeLightboxItem.tag}
									</span>
								</div>
								<h3 className="lightboxTitle">{activeLightboxItem.title}</h3>
								<p className="lightboxDesc">
									{activeLightboxItem.description}
								</p>
							</div>

							<div className="lightboxActions">
								<button
									className="btn btn-blue"
									onClick={() => scrollToQuote(activeLightboxItem.title)}
								>
									Request Quote for This Item <ArrowRight size={15} />
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

export { Gallary as Gallery };
