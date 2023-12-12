"use client";
import { useState } from "react";

import { Home } from "react-feather";

import { BlurredBackground } from "@/src/components/lib/Sugar/BlurredBackground";
import { TileProps, Tiles } from "@/src/components/lib/Tile/SimpleTiles";

type TileSectionTile = Pick<
  TileProps,
  "description" | "name" | "title" | "subtitle"
>;

const BASE_TILES: TileSectionTile[] = [
  {
    title: "Store",
    subtitle: "In",
    name: "In Store",
    description:
      "For when you're shopping in the store and need help picking the best product.",
  },
  {
    title: "Online",
    subtitle: "I'm",
    name: "Online",
    description:
      "For when you're shopping online and need ideas for your next step.",
  },
];

const AISLE_TILES: TileSectionTile[] = [
  {
    title: "Aisle 1",
    name: "Aisle 1",
    description: "Dried foods and trail mix.",
  },
  {
    title: "Aisle 2",
    name: "Aisle 2",
    description: "Milk and Dairy products.",
  },
  {
    title: "Aisle 3",
    name: "Aisle 3",
    description: "Laundry and household cleaners.",
  },
];

const PRODUCT_TYPE_TILES: TileSectionTile[] = [
  {
    title: "Product Type 1",
    name: "Product Type 1",
    description: "Product Type 1",
  },
  {
    title: "Product Type 2",
    name: "Product Type 2",
    description: "Product Type 2",
  },
  {
    title: "Product Type 3",
    name: "Product Type 3",
    description: "Product Type 3",
  },
];

type TileSectionProps = {
  handleClick: (tileName: string) => void;
  tiles: TileSectionTile[];
  className?: string;
};

function TileSection({ handleClick, tiles, className }: TileSectionProps) {
  return (
    <div className={`flex ${className}`}>
      <Tiles>
        {tiles.map((tile) => (
          <Tiles.Tile
            key={tile.name}
            name={tile.name}
            title={tile.title}
            subtitle={tile.subtitle}
            description={tile.description}
            onClick={() => handleClick(tile.name)}
            background={<BlurredBackground />}
          />
        ))}
      </Tiles>
    </div>
  );
}

type CurrentPathProps = {
  selectedTile: string;
  handleClickingBaseTileTitle: () => void;
  selectedAisle: string;
  handleClickingAisleTileTitle: () => void;
  selectedProductType: string;
  handleClickingProductTypeTileTitle: () => void;
  className?: string;
};

function CurrentPath({
  selectedTile,
  handleClickingBaseTileTitle,
  selectedAisle,
  handleClickingAisleTileTitle,
  selectedProductType,
  handleClickingProductTypeTileTitle,
}: CurrentPathProps) {
  return (
    <nav className={`text-3xl font-subHeader mb-5`}>
      {selectedTile !== "" ? (
        <>
          <button onClick={handleClickingBaseTileTitle} className="underline">
            <Home />
          </button>
          {selectedAisle === "" && selectedProductType === ""
            ? ` > ${selectedTile}`
            : ""}
        </>
      ) : (
        ""
      )}
      {selectedAisle !== "" ? (
        <>
          {" > "}
          <button onClick={handleClickingAisleTileTitle} className="underline">
            {selectedTile}
          </button>
          {" > "}
          {selectedAisle}
        </>
      ) : (
        ""
      )}
      {selectedProductType !== "" ? (
        <>
          {" > "}
          <button
            onClick={handleClickingProductTypeTileTitle}
            className="underline"
          >
            {selectedTile}
          </button>
          {" > "}
          {selectedProductType}
        </>
      ) : (
        ""
      )}
    </nav>
  );
}

function Path() {
  const [selectedTile, setSelectedTile] = useState("");
  const [selectedAisle, setSelectedAisle] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");

  const handleTileClick = (cardName: string) => {
    setSelectedTile(cardName);
    setSelectedAisle("");
    setSelectedProductType("");
  };

  const handleAisleClick = (aisleName: string) => {
    setSelectedAisle(aisleName);
  };

  const handleProductTypeClick = (productType: string) => {
    setSelectedProductType(productType);
  };

  const handleClickingBaseTileTitle = () => {
    setSelectedTile("");
    setSelectedAisle("");
    setSelectedProductType("");
  };

  const handleClickingAisleTileTitle = () => {
    setSelectedAisle("");
  };

  const handleClickingProductTypeTileTitle = () => {
    setSelectedProductType("");
  };

  return (
    <div className="profile p-10">
      <h2>Where are we going today?</h2>
      <CurrentPath
        selectedTile={selectedTile}
        handleClickingBaseTileTitle={handleClickingBaseTileTitle}
        selectedAisle={selectedAisle}
        handleClickingAisleTileTitle={handleClickingAisleTileTitle}
        selectedProductType={selectedProductType}
        handleClickingProductTypeTileTitle={handleClickingProductTypeTileTitle}
      />
      {selectedTile === "" && (
        <TileSection
          className="mt-14"
          handleClick={handleTileClick}
          tiles={BASE_TILES}
        />
      )}

      {selectedTile === "In Store" && (
        <section>
          <h3 className="mb-2">Select Aisle</h3>
          <TileSection handleClick={handleAisleClick} tiles={AISLE_TILES} />
        </section>
      )}

      {selectedTile === "Online" && (
        <section>
          <h3 className="mb-2">Select Product Type</h3>
          <TileSection
            handleClick={handleProductTypeClick}
            tiles={PRODUCT_TYPE_TILES}
          />
        </section>
      )}
    </div>
  );
}

export default Path;
