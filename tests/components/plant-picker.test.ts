import { describe, expect, it } from "vitest";
import { filterPickerPlants, shouldCommitPlantPickerSelection } from "../../src/components/PlantPicker";

const plants = [
  { id: "apple", name: "Apple", category: "Multi Harvest", baseValue: 12, baseWeight: 1.5, singleHarvest: false, sourceUrl: "https://example.com" },
  { id: "carrot", name: "Carrot", category: "Single Harvest", baseValue: 5, baseWeight: 0.8, singleHarvest: true, sourceUrl: "https://example.com" },
  { id: "coconut", name: "Coconut", category: "Multi Harvest", baseValue: 60, baseWeight: 1.5, singleHarvest: false, sourceUrl: "https://example.com" }
];

describe("PlantPicker", () => {
  it("finds a plant by name without exposing a button wall", () => {
    expect(filterPickerPlants(plants, "coco", "All").map((plant) => plant.name)).toEqual(["Coconut"]);
  });

  it("keeps harvest filters and search working together", () => {
    expect(filterPickerPlants(plants, "a", "Single Harvest").map((plant) => plant.name)).toEqual(["Carrot"]);
    expect(filterPickerPlants(plants, "", "Multi Harvest").map((plant) => plant.name)).toEqual(["Apple", "Coconut"]);
  });

  it("does not treat Enter on a harvest filter as a plant selection", () => {
    const searchInput = {} as EventTarget;
    const multiFilter = {} as EventTarget;

    expect(shouldCommitPlantPickerSelection("Enter", multiFilter, searchInput)).toBe(false);
    expect(shouldCommitPlantPickerSelection("Enter", searchInput, searchInput)).toBe(true);
  });
});
