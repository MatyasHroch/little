const places = ["Jezero Bled", "Jezero Bohinj"];

export default {
  main: {
    place_list: [
      {
        name: places[1],
        description: "",
        route: {
          name: places[1] + " - autem",
          duration: "1 hodina 30 minut",
          distance: "80 km",
          map_src: "https://frame.mapy.cz/s/jukadecojo",
        },
        route_list: [
          {
            name: places[1] + " - mírná trasa",
            duration: "1 hodina 30 minut",
            distance: "10 km",
            map_src: "https://frame.mapy.cz/s/jukadecojo",
          },
          {
            name: places[1] + " - střední cesta",
            duration: "2 hodiny 30 minut",
            distance: "10 km",
            map_src: "https://frame.mapy.cz/s/jukadecojo",
          },
        ],
      },
    ],
  },
};
