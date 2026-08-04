import Link from "next/link";
import { CalculatorTool, type CalculatorMutation, type CalculatorPlant } from "@/components/CalculatorTool";
import { JsonLd } from "@/components/JsonLd";
import { getSelectableMutations, getSelectablePlants } from "@/data/game/entities";
import { faqSchema, pageMetadata, webAppSchema, websiteSchema } from "@/lib/seo";

const title = "Grow a Garden 2 Calculator - Free Plant Value, Mutation & Trade Tool";
const description =
  "Check Grow a Garden 2 plant value, target weight, mutations, Fruit Price and friend boosts in one free calculator.";

export const metadata = pageMetadata(title, description, "/");

const sourceUrl = "https://growagarden2.fandom.com/wiki/Mechanics";
const sourceLabel = "the Grow A Garden 2 community guide";

const plants: CalculatorPlant[] = getSelectablePlants().map((plant) => ({
  id: plant.id,
  name: plant.name,
  category: plant.multiHarvest ? "Multi Harvest" : "Single Harvest",
  baseValue: plant.baseSellValue,
  baseWeight: plant.baseWeightKg,
  singleHarvest: !plant.multiHarvest,
  minimumValue: plant.minimumSellValue,
  sizeExponent: plant.sizeExponentOverride,
  sellTimeMultiplier: plant.sellTimeMultiplier,
  sourceUrl: plant.sourceUrl
}));

const mutations: CalculatorMutation[] = getSelectableMutations().map((mutation) => ({
  id: mutation.id,
  name: mutation.name,
  multiplier: mutation.multiplier,
  sourceUrl: mutation.sourceUrl
}));

const faqs = [
  {
    question: "How does the Grow a Garden 2 Calculator estimate plant value?",
    answer:
      "Pick your plant, enter its weight and quantity, then choose the bonuses you can actually see in your game. The calculator gives you a quick Sheckles estimate."
  },
  {
    question: "Can a crop use more than one mutation in Grow a Garden 2?",
    answer:
      "No. Pick the one mutation currently on the plant."
  },
  {
    question: "What does Value to Weight calculate?",
    answer:
      "Set the Sheckles you want, then it tells you roughly how heavy the plant needs to be with your selected bonuses."
  },
  {
    question: "Is this an official Grow a Garden 2 tool?",
    answer:
      "No. It is a free fan-made helper. Game updates can change plant values and bonuses."
  }
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Grow a Garden 2 plants available in the calculator",
  numberOfItems: plants.length,
  itemListElement: plants.map((plant, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: plant.name
  }))
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={webAppSchema("Grow a Garden 2 Calculator", description, "/")} />
      <JsonLd data={faqSchema(faqs)} />
      {plants.length > 0 ? <JsonLd data={itemListSchema} /> : null}

      <section className="section section-tight" id="calculator" style={{ paddingTop: 18 }}>
        <CalculatorTool
          mutations={mutations}
          plants={plants}
          sourceLabel={sourceLabel}
          sourceUrl={sourceUrl}
        />
      </section>

      <section className="section section-tight">
        <p className="eyebrow">Quick player notes</p>
        <h2>Make a better call before you sell</h2>
        <div className="panel" style={{ maxWidth: 1050 }}>
          <p>
            Start with the plant in your backpack, not a long spreadsheet. Put in its weight and how many you have, then match the Fruit Price bonus, mutation, friends and decay from your server. The total is there before you decide whether to sell, keep growing or trade.
          </p>
          <p>
            Use Plant Value when you know the weight. Use Find Weight when you have a Sheckles goal. Add several picks to your harvest list for a quick total. This is an estimate, not a live shop or a trade promise—always check the bonus your own game is showing.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <p className="eyebrow">More player tools</p>
        <h2>Keep your next move simple</h2>
        <div className="grid">
          <article className="panel">
            <h3>Trading Calculator</h3>
            <p>Put both offers side by side before you accept.</p>
            <Link className="button" href="/grow-a-garden-2-trading-calculator">Open trading calculator</Link>
          </article>
          <article className="panel">
            <h3>Mutation Calculator</h3>
            <p>See what one mutation changes for a plant you are holding.</p>
            <Link className="button" href="/grow-a-garden-2-mutation-calculator">Open mutation calculator</Link>
          </article>
          <article className="panel">
            <h3>Value List</h3>
            <p>Find a plant quickly when you only need a starting point.</p>
            <Link className="button" href="/grow-a-garden-2-value-list">Open value list</Link>
          </article>
          <article className="panel">
            <h3>Pet Calculator</h3>
            <p>Look up what a pet can help with in your garden.</p>
            <Link className="button" href="/grow-a-garden-2-pet-calculator">Open pet calculator</Link>
          </article>
        </div>
      </section>

      <section className="section section-tight">
        <p className="eyebrow">Before you sell</p>
        <h2>Things worth knowing</h2>
        <div className="grid">
          {faqs.map((faq) => (
            <article className="panel" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
