import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Class Craft Ghana | Custom School Identity",
	description:
		"Custom school fabrics, uniforms, jerseys, badges, event cloth and school supplies in Ghana — designed around your school.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
