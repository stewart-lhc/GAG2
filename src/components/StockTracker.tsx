"use client";

import { useMemo, useState } from "react";
import { WatchIntentPanel } from "@/components/WatchIntentPanel";
import { stockItems } from "@/data/site";

const shops = ["All", "Seed Shop", "Gear Shop", "Pet Egg Shop", "Event Shop", "Weather"];

export function StockTracker() {
  const [shop, setShop] = useState("All");
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("All");

  const filtered = useMemo(() => {
    return stockItems.filter((item) => {
      const matchesShop = shop === "All" || item.shop === shop;
      const matchesRarity = rarity === "All" || item.rarity === rarity;
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
      return matchesShop && matchesRarity && matchesQuery;
    });
  }, [shop, query, rarity]);

  return (
    <div className="panel">
      <div className="two-col" style={{ marginBottom: 18 }}>
        <div>
          <span className="badge badge-confirmed">Verified-only inventory</span>
          <h2 style={{ marginTop: 14 }}>Stock Filters</h2>
          <p className="muted">
            Filter by shop, rarity, or search. Unknown rows stay visible without being
            treated as live inventory.
          </p>
        </div>
        <div className="inventory-slots">
          <div className="inventory-slot">
            <h3>Rare seed slot</h3>
            <p className="muted">Alert when verified</p>
          </div>
          <div className="inventory-slot">
            <h3>Defense gear</h3>
            <p className="muted">Night protection</p>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 18 }}>
        <WatchIntentPanel
          items={[
            {
              id: "rare_seed",
              label: "Rare seed",
              description: "Track rare or event seed availability."
            },
            {
              id: "defense_gear",
              label: "Defense gear",
              description: "Watch for gear useful before night."
            },
            {
              id: "pet_egg",
              label: "Pet egg",
              description: "Track egg shop changes once verified."
            },
            {
              id: "event_shop",
              label: "Event shop",
              description: "Watch limited event stock."
            },
            {
              id: "weather_event",
              label: "Weather/Event",
              description: "Watch special weather or event states."
            }
          ]}
          storageKey="gag2:stock-watch-intent"
          title="Your Stock Watchlist Intent"
        />
      </div>
      <div className="tabs" aria-label="Shop filters">
        {shops.map((shopName) => (
          <button
            className={`tab ${shop === shopName ? "active" : ""}`}
            key={shopName}
            onClick={() => setShop(shopName)}
            type="button"
          >
            {shopName}
          </button>
        ))}
      </div>
      <div className="grid" style={{ marginTop: 16 }}>
        <div className="field">
          <label htmlFor="stock-search">Search inventory</label>
          <input
            className="input"
            id="stock-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Seed, gear, egg, event"
            value={query}
          />
        </div>
        <div className="field">
          <label htmlFor="rarity-filter">Rarity</label>
          <select
            className="select"
            id="rarity-filter"
            onChange={(event) => setRarity(event.target.value)}
            value={rarity}
          >
            {["All", "Unknown", "Common", "Uncommon", "Rare", "Legendary"].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="table-wrap" style={{ marginTop: 16 }}>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Shop</th>
              <th>Status</th>
              <th>Refresh</th>
              <th>Verified</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.name}</strong>
                  <br />
                  <span className="muted">{item.price}</span>
                </td>
                <td>{item.shop}</td>
                <td>{item.status}</td>
                <td>{item.refreshEta}</td>
                <td>{item.lastVerified}</td>
                <td>{item.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="callout" style={{ marginTop: 16 }}>
        No GAG2 stock cycle is treated as confirmed yet. This tracker is ready for verified
        inventory entries and intentionally shows unknown states until then.
      </p>
    </div>
  );
}
