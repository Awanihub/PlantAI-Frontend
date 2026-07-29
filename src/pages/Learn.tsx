import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Sprout,
  Bug,
  Scissors,
  Info,
  X,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Learn = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState<any>(null);


  const topics = [
    {
      icon: Sprout,
      title: "Plant Care Basics",
      description: "Essential knowledge for plant parents",
      content: `
🌱 Plant Care Basics

1. Watering:
- Check soil moisture before watering.
- Avoid overwatering because it can cause root rot.
- Different plants require different watering schedules.

2. Sunlight:
- Understand whether your plant needs direct, indirect, or low light.
- Rotate plants regularly for balanced growth.

3. Soil:
- Use well-draining soil.
- Add compost for better nutrients.

4. Fertilizer:
- Feed plants during growing seasons.
- Avoid excessive fertilizer.
      `,
    },

    {
      icon: Bug,
      title: "Pest Management",
      description: "Identify and treat common plant pests",
      content: `
🐛 Pest Management

Common pests:

1. Aphids:
- Small insects on leaves.
- Remove using neem oil spray.

2. Spider Mites:
- Cause yellow spots.
- Increase humidity and clean leaves.

3. Mealybugs:
- White cotton-like insects.
- Remove manually and apply organic pesticide.

Prevention:
- Keep plants clean.
- Avoid overcrowding.
- Inspect new plants.
      `,
    },


    {
      icon: Scissors,
      title: "Pruning & Propagation",
      description: "Learn to trim and multiply your plants",
      content: `
✂️ Pruning & Propagation

Pruning:
- Remove dead or damaged leaves.
- Helps plants grow healthier.
- Use clean scissors.

Propagation:

Methods:
1. Stem cutting
2. Leaf cutting
3. Root division

Best time:
Spring and early summer.
      `,
    },


    {
      icon: Info,
      title: "Common Problems",
      description: "Solutions to typical plant issues",
      content: `
⚠️ Common Plant Problems

Yellow Leaves:
- Overwatering
- Nutrient deficiency
- Lack of sunlight


Drooping Leaves:
- Underwatering
- Root problems


Slow Growth:
- Poor soil
- Lack of nutrients
- Incorrect lighting


Always identify the cause before treatment.
      `,
    },
  ];



  const askAI = async () => {

    if (!question.trim()) return;

    setLoading(true);

    try {

      const response = await fetch(
        "https://plantai-backend-jumt.onrender.com/api/learn/ask",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("token")}`,
          },

          body:JSON.stringify({
            question,
          }),
        }
      );


      const data = await response.json();


      if(data.success){
        setAnswer(data.answer);
      }
      else{
        setAnswer("Unable to get answer");
      }


    } catch(error){

      console.error(error);
      setAnswer("Server error");

    }


    setLoading(false);

  };



  return (

<div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-8">


<header className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-md mb-6">

<div className="container mx-auto">


<Link
to="/dashboard"
className="inline-flex items-center text-sm mb-4"
>

<ArrowLeft className="w-4 h-4 mr-1"/>

Back to Garden

</Link>


<h1 className="text-2xl font-bold flex items-center gap-2">

<BookOpen className="w-6 h-6"/>

Learn & Grow

</h1>


<p className="text-sm mt-1 opacity-80">
Expand your plant knowledge
</p>


</div>

</header>





<div className="container mx-auto px-4 space-y-6">


{/* AI SECTION */}

<Card className="p-6">

<h2 className="text-xl font-bold mb-4">
🌱 Ask Plant AI
</h2>


<input

value={question}

onChange={(e)=>setQuestion(e.target.value)}

placeholder="Ask anything about plants..."

className="w-full border rounded-lg p-3"

/>


<button

onClick={askAI}

className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"

>

{
loading 
?
"Thinking..."
:
"Ask AI"
}

</button>


{
answer &&

<Card className="mt-4 p-4 bg-muted">

<h3 className="font-bold mb-2">
AI Answer
</h3>

<p className="whitespace-pre-wrap">
{answer}
</p>

</Card>

}


</Card>





{/* TOPICS */}

<div className="grid md:grid-cols-2 gap-4">


{
topics.map((topic,index)=>(


<Card

key={index}

onClick={()=>setSelectedTopic(topic)}

className="p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition"


>


<div className="flex gap-4">


<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">

<topic.icon className="w-6 h-6 text-primary"/>

</div>


<div>

<h3 className="font-semibold">

{topic.title}

</h3>


<p className="text-sm text-muted-foreground">

{topic.description}

</p>


</div>


</div>


</Card>


))

}


</div>






{/* POPUP DETAIL */}


{
selectedTopic &&

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">


<Card className="p-6 max-w-lg w-[90%] relative">


<button

onClick={()=>setSelectedTopic(null)}

className="absolute right-4 top-4"

>

<X/>

</button>



<h2 className="text-xl font-bold mb-4">

{selectedTopic.title}

</h2>


<p className="whitespace-pre-wrap text-sm text-muted-foreground">

{selectedTopic.content}

</p>



</Card>


</div>

}



{/* FAQ */}


<Card className="p-6">


<h2 className="text-xl font-bold mb-4">

Frequently Asked Questions

</h2>



<Accordion type="single" collapsible>


<AccordionItem value="1">

<AccordionTrigger>
How often should I water plants?
</AccordionTrigger>


<AccordionContent>

Water when the top soil layer feels dry.
Avoid fixed schedules.

</AccordionContent>

</AccordionItem>



<AccordionItem value="2">

<AccordionTrigger>
Why are leaves turning yellow?
</AccordionTrigger>


<AccordionContent>

Usually due to overwatering,
poor sunlight or nutrient deficiency.

</AccordionContent>

</AccordionItem>



<AccordionItem value="3">

<AccordionTrigger>
How much sunlight is required?
</AccordionTrigger>


<AccordionContent>

Depends on plant type.
Some need direct sunlight while others need indirect light.

</AccordionContent>


</AccordionItem>


</Accordion>


</Card>




</div>


</div>

  );
};


export default Learn;