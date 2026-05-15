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

export const ALL_BROCHURES_URL = "https://catalog.sutongctr.com";

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
    brandUrl: "https://catalog.sutongctr.com/synergy",
    categories: [
      { ...CATEGORY.mtr, brochureUrl: "https://midd.me/mZII" },
      { ...CATEGORY.trailer, brochureUrl: "https://midd.me/iVE1" },
    ],
  },
  {
    id: "longmarch",
    name: "Long March",
    logo: longmarch,
    brandUrl: "https://midd.me/PH2E",
    categories: [
      { ...CATEGORY.mtr, brochureUrl: "https://midd.me/PH2E" },
    ],
  },
  {
    id: "supercargo",
    name: "SuperCargo",
    logo: supercargo,
    brandUrl: "https://catalog.sutongctr.com/supercargo",
    categories: [
      { ...CATEGORY.mtr, brochureUrl: "https://midd.me/Omro" },
      { ...CATEGORY.trailer, brochureUrl: "https://midd.me/SP1F" },
    ],
  },
  {
    id: "roadone",
    name: "RoadOne",
    logo: roadone,
    brandUrl: "https://catalog.sutongctr.com/roadone",
    categories: [
      { ...CATEGORY.mtr, brochureUrl: "https://midd.me/iBv8" },
      { ...CATEGORY.consumer, brochureUrl: "https://midd.me/07hK" },
    ],
  },
  {
    id: "hemisphere",
    name: "Hemisphere",
    logo: hemisphere,
    brandUrl: "https://catalog.sutongctr.com/hemisphere",
    categories: [
      { ...CATEGORY.consumer, brochureUrl: "https://midd.me/xAhb" },
    ],
  },
  {
    id: "hirun",
    name: "Hi-Run",
    logo: hirun,
    brandUrl: "https://catalog.sutongctr.com/hirun",
    categories: [
      { ...CATEGORY.trailer, brochureUrl: "https://midd.me/jj3t" },
      { ...CATEGORY.lg, brochureUrl: "https://midd.me/nWCw" },
      { ...CATEGORY.tube, brochureUrl: "https://midd.me/g5dq" },
      { ...CATEGORY.atv, brochureUrl: "https://midd.me/S3co" },
    ],
  },
  {
    id: "caraway",
    name: "Caraway",
    logo: caraway,
    categories: [
      { ...CATEGORY.trailer, brochureUrl: "https://midd.me/ebFH" },
    ],
  },
  {
    id: "wolfpack",
    name: "Wolf Pack",
    logo: wolfpack,
    brandUrl: "https://catalog.sutongctr.com/wolfpack",
    categories: [
      { ...CATEGORY.atv, brochureUrl: "https://midd.me/v55B" },
      { ...CATEGORY.lg },
    ],
  },
];
