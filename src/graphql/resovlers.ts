import { type Context } from "./context";
import { ColorLocation, Underground, Palette, HueColor } from "@prisma/client";
import { pages } from "../data/questions";

export const resolvers = {
  Query: {
    getColorChoice: (_parent: any, _args: any, context: Context) => {
      return context.prisma.colorChoice.findMany();
    },

    getLatestChoice: (_parent: any, _args: any, context: Context) => {
      const latestChoice = context.prisma.colorChoice.findFirst({
        orderBy: {
          createdAt: "desc",
        },
      });
      return [latestChoice];
    },

    getSpecificProducts: (
      _parent: any,
      args: { ids: number[] },
      context: Context
    ) => {
      const { ids } = args;
      const productDetails = ids.map((id) =>
        context.prisma.displayProducts.findUnique({ where: { id } })
      );
      return productDetails;
    },

    getDisplayProduct: (_parent: any, _args: any, context: Context) => {
      return context.prisma.displayProducts.findMany();
    },
  },

  Mutation: {
    createNewColorChoice: (
      _parent: any,
      args: {
        input: {
          colorLocation: ColorLocation;
          underground: [Underground];
          opacityKnowledge: boolean;
          hue: HueColor;
          opacityStrength?: string;
          palette?: Palette;
        };
      },
      context: Context
    ) => {
      return context.prisma.colorChoice.create({
        data: {
          colorLocation: args.input.colorLocation,
          underground: args.input.underground,
          opacityKnowledge: args.input.opacityKnowledge,
          hue: args.input.hue,
          opacityStrength: args.input.opacityStrength
            ? args.input.opacityStrength
            : null,
          palette: args.input.palette ? args.input.palette : null,
        },
      });
    },

    CreateDisplayProduct: (
      _parent: any,
      args: {
        input: {
          productName: string;
          shortDescription: string;
          benefits: string;
          imageUrl: string;
          scoringMatrix: number[];
        };
      },
      context: Context
    ) => {
      const { scoringMatrix } = args.input;
      if (scoringMatrix.length !== pages.length) {
        throw new Error(
          `scoringMatrix must have exactly ${pages.length} values`
        );
      }
      return context.prisma.displayProducts.create({
        data: {
          productName: args.input.productName,
          shortDescription: args.input.shortDescription,
          benefits: args.input.benefits,
          imageUrl: args.input.imageUrl,
          scoringMatrix: args.input.scoringMatrix,
        },
      });
    },
  },
};
