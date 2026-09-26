import React from "react";
import { ProductAttribute } from "../../types";
import { Check } from "lucide-react";

interface SwatchPickerProps {
  attributes: ProductAttribute[];
  selectedOptions: Record<string, string>;
  onSelectOption: (attributeName: string, termSlug: string) => void;
}

// Map common finish/fabric terms to elegant visual approximations or colors
const swatchColorMap: Record<string, string> = {
  oak: "#b89778",
  walnut: "#4b3621",
  ash: "#dcd0c0",
  teak: "#8b5a2b",
  black: "#1c1917",
  charcoal: "#333333",
  white: "#fafaf9",
  ivory: "#f5f5dc",
  beige: "#d8cbb5",
  boucle: "#eae6df",
  velvet: "#5c4033",
  leather: "#795548",
  linen: "#e3dac9",
  taupe: "#8b8589",
  terracotta: "#c86a4b",
  olive: "#556b2f",
  forest: "#2e4a36",
  navy: "#1a2a3a",
};

function getSwatchColor(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, color] of Object.entries(swatchColorMap)) {
    if (lower.includes(key)) return color;
  }
  return "#c5a880"; // Luxury default gold/sand
}

const SwatchPicker: React.FC<SwatchPickerProps> = ({
  attributes,
  selectedOptions,
  onSelectOption,
}) => {
  if (!attributes || attributes.length === 0) return null;

  return (
    <div className="space-y-6 pt-2">
      {attributes.map((attr) => {
        const isTextureOrFabric =
          attr.name.toLowerCase().includes("texture") ||
          attr.name.toLowerCase().includes("fabric") ||
          attr.name.toLowerCase().includes("color") ||
          attr.name.toLowerCase().includes("finish");

        const isSizeOrSeat =
          attr.name.toLowerCase().includes("size") ||
          attr.name.toLowerCase().includes("seat") ||
          attr.name.toLowerCase().includes("dimension");

        const currentSelected = selectedOptions[attr.name] || attr.terms[0]?.slug;

        return (
          <div key={attr.id || attr.name} className="space-y-2.5">
            {/* Attribute Label & Selected Value */}
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-widest font-semibold text-stone-900">
                {attr.name}
              </span>
              <span className="text-stone-500 font-light capitalize">
                {attr.terms.find((t) => t.slug === currentSelected)?.name || currentSelected}
              </span>
            </div>

            {/* Visual Swatches for Textures & Fabrics */}
            {isTextureOrFabric ? (
              <div className="flex flex-wrap gap-2.5">
                {attr.terms.map((term) => {
                  const isSelected = currentSelected === term.slug;
                  const color = getSwatchColor(term.name);

                  return (
                    <button
                      key={term.id || term.slug}
                      type="button"
                      onClick={() => onSelectOption(attr.name, term.slug)}
                      className={`group relative flex items-center justify-center rounded-full transition-all ${
                        isSelected
                          ? "ring-2 ring-stone-950 ring-offset-2 scale-105"
                          : "ring-1 ring-sand-300 hover:ring-stone-600 hover:scale-105"
                      }`}
                      style={{ width: "36px", height: "36px" }}
                      title={term.name}
                    >
                      <span
                        className="w-full h-full rounded-full border border-black/10 shadow-inner flex items-center justify-center"
                        style={{ backgroundColor: color }}
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow-md stroke-[2.5]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Buttons / Pills for Sizes & Seats */
              <div className="flex flex-wrap gap-2">
                {attr.terms.map((term) => {
                  const isSelected = currentSelected === term.slug;

                  return (
                    <button
                      key={term.id || term.slug}
                      type="button"
                      onClick={() => onSelectOption(attr.name, term.slug)}
                      className={`px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-all border ${
                        isSelected
                          ? "bg-stone-950 text-white border-stone-950 shadow-sm"
                          : "bg-white text-stone-700 border-sand-300 hover:border-stone-700"
                      }`}
                    >
                      {term.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SwatchPicker;
