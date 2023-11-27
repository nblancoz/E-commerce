"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [
      {
        name: "Nike Mercurial Superfly",
        description: "Nike ultralight cleats for forwards",
        price: 220,
        img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/37fa6bf2-b8dc-48ab-b695-8a8509e79a66/mercurial-superfly-9-elite-botas-de-futbol-de-perfil-alto-cesped-artificial-dr0NFn.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Adidas Copa",
        description: "Adidas cleats made of leather",
        price: 150,
        img: "https://www.futbolemotion.com/imagesarticulos/88055/750/bota-adidas-copa-mundial-0.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Portugal First Jersey",
        description: "Nike Stadium Home First Jersey of Portugal",
        price: 95,
        img: "https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/abbf5437a995fd7cabd85bbbc7fdfb0f/a/5/a59fc755cd46d1f7c17cddbb6ba21dd982c2b075d4b2203e6b886a7cb1d46883.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Portugal Second Jersey",
        description: "Nike Stadium Visit Jersey of Portugal",
        price: 85,
        img: "https://media.futbolmania.com/media/catalog/product/cache/1/image/0f330055bc18e2dda592b4a7c3a0ea22/D/N/DN0691-133_camiseta-color-z-beige-nike-2a-portugal-2022-2023-dri-fit-stadium_1_completa-frontal.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
