export const pages = [
  {
    id: "1",
    title: "In which area do you want to apply the color?",
    inputs: [
      {
        id: "colorLocation",
        type: "radio",
        label:
          "Knowing the specific area helps us recommend the right type and quantity of paint for optimal results.",
        requireImage: true,
        options: [
          {
            text: "Outside",
            imageUrl:
              "https://www.thehousedesigners.com/blog/wp-content/uploads/2022/06/1053.jpg",
            weight: 0.4,
          },
          {
            text: "Inside",
            imageUrl:
              "https://cdn.mos.cms.futurecdn.net/ZMkxbnVcM59eBb4oBF6S8e.jpg",
            weight: 0.2,
          },
        ],
      },
    ],
    nextPage: "2",
  },
  {
    id: "2",
    title: "On what surface should the paint be applied?",
    inputs: [
      {
        id: "underground",
        type: "checkbox",
        label:
          "Different surfaces may require specific types of paint to ensure proper adhesion and longevity.",
        requireImage: true,
        options: [
          {
            text: "Wood",
            imageUrl:
              "https://img.freepik.com/free-photo/dark-brown-wood-texture-background-with-design-space_53876-160419.jpg?w=360",
            weight: 0.3,
          },
          {
            text: "Facade",
            imageUrl:
              "https://www.sto.com/media/images/portfolio/facades/inspiration_2/texture/25892_1200.jpg",
            weight: 0.5,
          },
          {
            text: "Wallpaper",
            imageUrl:
              "https://netrinoimages.s3.eu-west-2.amazonaws.com/2015/05/25/389548/137027/seamless_texture_wallpaper_psd_ai_eps_png_svg_tif_cdr_jpg_hdr_1617492_o.jpg",
            weight: 0.6,
          },
          {
            text: "Plaster",
            imageUrl:
              "https://images.photowall.com/products/58105/plaster-texture-wall.jpg?h=699&q=85",
            weight: 0.2,
          },
        ],
      },
    ],
    nextPage: "3",
  },
  {
    id: "3",
    title: "Do you know about the opacity?",
    inputs: [
      {
        id: "opacityKnowledge",
        type: "radio",
        label:
          "Understanding opacity is important as it determines how much the underlying surface or previous color will show through the new paint.",
        requireImage: false,
        options: [
          {
            text: "Yes",
            weight: 0.7,
          },
          {
            text: "No",
            weight: 0.2,
          },
        ],
      },
    ],
    nextPage: "4",
    conditionalNextPages: {
      opacityKnowledge: {
        Yes: "4-1",
        No: "4-2",
      },
    },
  },
  {
    id: "4-1",
    title: "How strong should the opacity of color be?",
    inputs: [
      {
        id: "opacityStrength",
        type: "range",
        label:
          "Determining the desired opacity level helps us suggest the appropriate paint that achieves your desired coverage and visual effect.",
        requireImage: false,
        min: 0,
        max: 3,
        step: 1,
        options: [
          {
            text: "<95",
            weight: 0.3,
          },
          {
            text: "95",
            weight: 0.5,
          },
          {
            text: "98",
            weight: 0.8,
          },
          {
            text: ">99.8",
            weight: 0.2,
          },
        ],
      },
    ],
    nextPage: "5",
  },
  {
    id: "4-2",
    title: "On what palette should the paint be applied?",
    inputs: [
      {
        id: "palette",
        type: "radio",
        label:
          "Choosing a specific palette helps us recommend colors that align with your overall aesthetic or design scheme.",
        requireImage: true,
        options: [
          {
            text: "Brighter",
            imageUrl:
              "https://media02.stockfood.com/largepreviews/NDAzMDA5NzAz/13000313-Heller-Steinuntergrund.jpg",
            weight: 0.3,
          },
          {
            text: "Darker",
            imageUrl:
              "https://media02.stockfood.com/largepreviews/NDE0MzA3MzQz/13364753-Dunkler-Untergrund.jpg",
            weight: 0.7,
          },
        ],
      },
    ],
    nextPage: "5",
  },
  {
    id: "5",
    title: "Choose the hue you want",
    inputs: [
      {
        id: "hue",
        type: "radio",
        label:
          "Identifying the hue preference allows us to suggest colors within that range, ensuring a personalized and satisfying paint recommendation.",
        requireImage: false,
        options: [
          {
            text: "Red",
            weight: 0.2,
          },
          {
            text: "Blue",
            weight: 0.7,
          },
          {
            text: "Green",
            weight: 0.2,
          },
          {
            text: "Yellow",
            weight: 0.8,
          },
          {
            text: "White",
            weight: 0.4,
          },
        ],
      },
    ],
    nextPage: null,
  },
];
