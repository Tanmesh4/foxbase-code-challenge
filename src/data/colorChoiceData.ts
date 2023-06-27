import { ColorLocation, Underground, Palette, HueColor } from "@prisma/client";
export const colorChoice = [
  {
    colorLocation: ColorLocation.Outside,
    underground: [Underground.Wood, Underground.Facade],
    opacityKnowledge: true,
    opacityStrength: "92",
    palette: null,
    hue: HueColor.Red,
  },
  {
    colorLocation: ColorLocation.Inside,
    underground: [Underground.Plaster, Underground.Wallpaper],
    opacityKnowledge: false,
    opacityStrength: null,
    palette: Palette.Darker,
    hue: HueColor.Blue,
  },
];
