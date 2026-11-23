import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PropertyCard } from "./property-card";
import { properties } from "@/data/properties";
import { formatPrice } from "@/lib/utils";

describe("PropertyCard", () => {
  it("renders title and price", () => {
    render(<PropertyCard property={properties[0]} />);
    expect(screen.getByText(properties[0].title)).toBeInTheDocument();
    expect(screen.getByText("₹1.55 Cr")).toBeInTheDocument();
  });
});

describe("formatPrice", () => {
  it("uses Indian units", () => {
    expect(formatPrice(8_500_000)).toBe("₹85 Lac");
    expect(formatPrice(45_000)).toBe("₹45,000");
  });
});
