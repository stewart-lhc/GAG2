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
      "Pick your plant, enter its weight and quantity, then match the bonuses you can actually see in your game. The calculator combines those choices into a quick Sheckles estimate for the plants you are holding."
  },
  {
    question: "Can a crop use more than one mutation in Grow a Garden 2?",
    answer:
      "Choose the mutation you want to check from the list and use the one that matches the effect shown on your plant. If your plant has a special combination, treat this result as a guide and re-check the payout in your server."
  },
  {
    question: "What does Value to Weight calculate?",
    answer:
      "Switch to Find weight, enter the Sheckles you want, and the calculator gives you a weight to aim for with the selected plant, quantity and bonuses."
  },
  {
    question: "How should I enter Fruit Price, friends and decay?",
    answer:
      "Match the Fruit Price button to the bonus in your server, choose the mutation on the plant, then enter the friends count and decay percentage you see in game. Leave friends at 0 and decay at 0% when neither applies."
  },
  {
    question: "Why can my in-game payout be different?",
    answer:
      "Plant values and bonuses can change with updates, and the game may handle a special crop or rounding slightly differently. Check the current bonus in your own server and use this number as a planning estimate."
  },
  {
    question: "Is this an official Grow a Garden 2 tool?",
    answer:
      "No. It is a free fan-made helper using community-checked data. It is not a live game feed, an official quote, or a trade guarantee."
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
        <p className="eyebrow">Four quick steps</p>
        <h2>How to use this calculator</h2>
        <div className="grid">
          <article className="panel">
            <h3>1. Pick your plant</h3>
            <p>Open the plant picker and choose the crop you are holding. Each plant starts with its own base value and weight, so the right choice matters before you add any bonuses.</p>
          </article>
          <article className="panel">
            <h3>2. Enter weight or a target</h3>
            <p>For Plant value, enter the exact kg shown in game and how many you have. For Find weight, switch modes and enter the Sheckles total you want to reach.</p>
          </article>
          <article className="panel">
            <h3>3. Match your server bonuses</h3>
            <p>Set Fruit Price to Normal 1×, Big 2× or Mega 4× (or type the value you see). Then choose the mutation, enter Friends here, and add any Decay percentage shown in your game.</p>
          </article>
          <article className="panel">
            <h3>4. Check the result</h3>
            <p>Read Your payout or Weight to aim for. Add several plants to the harvest list when you want one running total, or copy a result before you trade or sell.</p>
          </article>
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
        <h2>Frequently asked questions</h2>
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
