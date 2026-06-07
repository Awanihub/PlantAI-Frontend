import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Sprout, Bug, Scissors, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Learn = () => {
  const topics = [
    {
      icon: Sprout,
      title: "Plant Care Basics",
      description: "Essential knowledge for plant parents",
    },
    {
      icon: Bug,
      title: "Pest Management",
      description: "Identify and treat common plant pests",
    },
    {
      icon: Scissors,
      title: "Pruning & Propagation",
      description: "Learn to trim and multiply your plants",
    },
    {
      icon: Info,
      title: "Common Problems",
      description: "Solutions to typical plant issues",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-8">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-md mb-6">
        <div className="container mx-auto">
          <Link to="/dashboard" className="inline-flex items-center text-sm mb-4 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Garden
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Learn & Grow
          </h1>
          <p className="text-primary-foreground/80 text-sm mt-1">Expand your plant knowledge</p>
        </div>
      </header>

      <div className="container mx-auto px-4 space-y-6">
        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 gap-4 animate-fade-in">
          {topics.map((topic, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <topic.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-card-foreground">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="p-6 border-border animate-slide-up">
          <h2 className="text-xl font-bold mb-4 text-card-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How often should I water my plants?</AccordionTrigger>
              <AccordionContent>
                Watering frequency depends on the plant type, pot size, and environment. Generally, most houseplants need water when the top 1-2 inches of soil feels dry. Stick your finger in the soil to check moisture levels before watering.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Why are my plant's leaves turning yellow?</AccordionTrigger>
              <AccordionContent>
                Yellow leaves can indicate several issues: overwatering (most common), underwatering, nutrient deficiency, or too much direct sunlight. Check the soil moisture and adjust your care routine accordingly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What is the best soil for indoor plants?</AccordionTrigger>
              <AccordionContent>
                Most indoor plants thrive in well-draining potting mix that retains some moisture but doesn't get waterlogged. A good mix typically contains peat moss or coco coir, perlite or vermiculite, and compost. Different plants may need specialized mixes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How much light do indoor plants need?</AccordionTrigger>
              <AccordionContent>
                Light requirements vary by plant. "Bright indirect light" means near a window but not in direct sun rays. "Low light" means away from windows but still in a lit room. "Direct light" means placing plants where sun rays hit them. Research your specific plant's needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I prevent pests on my plants?</AccordionTrigger>
              <AccordionContent>
                Prevention is key: inspect new plants before bringing them home, maintain proper plant health through correct watering and feeding, ensure good air circulation, and regularly clean plant leaves. Quarantine new plants for 2-3 weeks before placing them near your collection.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Tips Card */}
        <Card className="p-6 bg-accent/10 border-accent/20 animate-fade-in">
          <h3 className="font-semibold text-lg mb-3 text-card-foreground">Quick Care Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">💡</span>
              <span>Rotate your plants weekly for even growth</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">💡</span>
              <span>Wipe leaves with damp cloth to remove dust</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">💡</span>
              <span>Group plants together to increase humidity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">💡</span>
              <span>Feed plants during growing season (spring/summer)</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Learn;
