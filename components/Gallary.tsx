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

import { GALLERY_ITEMS } from "./galleryData";
import type { GalleryItem } from "./galleryData";

export type { GalleryItem };


type CategoryKey =
	| "all"
	| "fabrics"
	| "uniforms"
	| "badges"
	| "sports"
	| "supplies"
	| "misc";

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
			misc: 0,
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
			{ key: "misc", label: "Miscellaneous", count: counts.misc },
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
									{activeLightboxItem.title} — part of our{" "}
									{activeLightboxItem.categoryLabel.toLowerCase()} collection,
									customized around your school colours, crest and artwork.
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
