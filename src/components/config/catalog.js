import synergy from "../../assets/pic/synergy.svg";
import supercargo from "../../assets/pic/supercargo.svg";
import roadone from "../../assets/pic/roadone.svg";
import hemisphere from "../../assets/pic/hemisphere.png";
import hirun from "../../assets/pic/hirun.svg";
import longmarch from "../../assets/pic/longmarch.svg";
import caraway from "../../assets/pic/caraway.svg";
import wolfpack from "../../assets/pic/wolfpack.svg";

import mtr from "../../assets/pic/mtr.svg";
import trailer from "../../assets/pic/trailer.svg";
import suv from "../../assets/pic/suv.svg";
import lg from "../../assets/pic/lg.svg";
import tube from "../../assets/pic/tube.svg";
import atv from "../../assets/pic/atv.svg";

// brochureId keys into src/components/config/brochures.js, which the flipbook
// build script generates. A category with no brochureId has no brochure yet.
const CATEGORY = {
  mtr: { icon: mtr, name: "Medium Truck Radial", short: "MTR" },
  trailer: { icon: trailer, name: "Trailer Tire", short: "Trailer Tire" },
  consumer: { icon: suv, name: "Consumer Tire", short: "Consumer Tire" },
  lg: { icon: lg, name: "L&G Tire", short: "L&G Tire" },
  tube: { icon: tube, name: "Tube", short: "Tube" },
  atv: { icon: atv, name: "ATV/UTV Tire", short: "ATV/UTV Tire" },
};

export const BRANDS = [
  {
    id: "synergy",
    name: "Synergy",
    logo: synergy,
    categories: [
      { ...CATEGORY.mtr, brochureId: "synergy-mtr" },
      { ...CATEGORY.trailer, brochureId: "synergy-str" },
    ],
  },
  {
    id: "longmarch",
    name: "Long March",
    logo: longmarch,
    categories: [{ ...CATEGORY.mtr, brochureId: "longmarch-mtr" }],
  },
  {
    id: "supercargo",
    name: "SuperCargo",
    logo: supercargo,
    categories: [
      { ...CATEGORY.mtr, brochureId: "supercargo-mtr" },
      { ...CATEGORY.trailer, brochureId: "supercargo-str" },
    ],
  },
  {
    id: "roadone",
    name: "RoadOne",
    logo: roadone,
    categories: [
      { ...CATEGORY.mtr, brochureId: "roadone-mtr" },
      { ...CATEGORY.consumer, brochureId: "roadone-plt" },
    ],
  },
  {
    id: "hemisphere",
    name: "Hemisphere",
    logo: hemisphere,
    categories: [{ ...CATEGORY.consumer, brochureId: "hemisphere-plt" }],
  },
  {
    id: "hirun",
    name: "Hi-Run",
    logo: hirun,
    categories: [
      { ...CATEGORY.trailer, brochureId: "hirun-st" },
      { ...CATEGORY.lg, brochureId: "hirun-specialty" },
      { ...CATEGORY.tube, brochureId: "hirun-tube" },
      { ...CATEGORY.atv, brochureId: "hirun-atvutv" },
    ],
  },
  {
    id: "caraway",
    name: "Caraway",
    logo: caraway,
    categories: [{ ...CATEGORY.trailer, brochureId: "caraway-st" }],
  },
  {
    id: "wolfpack",
    name: "Wolf Pack",
    logo: wolfpack,
    categories: [
      { ...CATEGORY.atv, brochureId: "wolfpack-atvutv" },
      { ...CATEGORY.lg },
    ],
  },
];
