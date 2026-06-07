import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import categoryIndoor from "@/assets/category-indoor.jpg";
import categorySucculents from "@/assets/category-succulents.jpg";
import categoryHerbs from "@/assets/category-herbs.jpg";
import categoryFlowering from "@/assets/category-flowering.jpg";
import categoryTropical from "@/assets/category-tropical.jpg";

const categories = [
  {
    id: 1,
    name: "Indoor Plants",
    description: "Perfect for your home and office spaces",
    image: categoryIndoor,
    color: "from-primary/20 to-primary-light/10",
  },
  {
    id: 2,
    name: "Succulents",
    description: "Low-maintenance desert beauties",
    image: categorySucculents,
    color: "from-bloom-pink/20 to-bloom-purple/10",
  },
  {
    id: 3,
    name: "Herbs",
    description: "Fresh and aromatic for your kitchen",
    image: categoryHerbs,
    color: "from-accent/20 to-earth/10",
  },
  {
    id: 4,
    name: "Flowering Plants",
    description: "Colorful blooms to brighten your day",
    image: categoryFlowering,
    color: "from-bloom-pink/20 to-bloom-yellow/10",
  },
  {
    id: 5,
    name: "Tropical Plants",
    description: "Exotic plants for a jungle vibe",
    image: categoryTropical,
    color: "from-primary-light/20 to-sky-blue/10",
  },
];

export const PlantCategoryCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-bloom-pink to-accent bg-clip-text text-transparent">
          Explore Plant Categories
        </h2>
        <p className="text-muted-foreground">
          Swipe to discover different types of plants
        </p>
      </div>

      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_80%] lg:flex-[0_0_60%] px-4"
              >
                <div className="relative group">
                  <div
                    className={`relative rounded-3xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-colorful group-hover:scale-105 bg-gradient-to-br ${category.color}`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-[400px] object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                      <h3 className="text-3xl font-bold mb-2 text-foreground drop-shadow-lg">
                        {category.name}
                      </h3>
                      <p className="text-lg text-foreground/90 drop-shadow-md">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-lg"
          onClick={scrollPrev}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-lg"
          onClick={scrollNext}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {categories.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
