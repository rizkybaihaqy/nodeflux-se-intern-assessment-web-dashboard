const faker = require('faker');

module.exports = () => {
  const data = {
    vips: [
      {
        id: 1,
        name: 'Taufik Hidayat',
        country_of_origin: 'Indonesia',
        eta: new Date(new Date().setMinutes(new Date().getMinutes() + 15))
          .toISOString()
          .replace(/T/, ' ')
          .replace(/[.]\d+Z/, ''),
        arrived: false,
        photo: faker.image.avatar(),
        attributes: ['red jacket indonesian team', 'blue jeans'],
      },
      {
        id: 2,
        name: 'Ferdinand Sinaga',
        country_of_origin: 'Indonesia',
        eta: new Date(new Date().setMinutes(new Date().getMinutes() + 5))
          .toISOString()
          .replace(/T/, ' ')
          .replace(/[.]\d+Z/, ''),
        arrived: false,
        photo: faker.image.avatar(),
        attributes: ['indonesian team jersey', 'blue jeans'],
      },
      {
        id: 3,
        name: 'Kurnia Mega',
        country_of_origin: 'Indonesia',
        eta: new Date(new Date().setMinutes(new Date().getMinutes() + 18))
          .toISOString()
          .replace(/T/, ' ')
          .replace(/[.]\d+Z/, ''),
        arrived: false,
        photo: faker.image.avatar(),
        attributes: ['indonesian jersey', 'gloves'],
      },
      {
        id: 4,
        name: 'Septian Dwi Kustanto',
        country_of_origin: 'Indonesia',
        eta: new Date(new Date().setMinutes(new Date().getMinutes() - 5))
          .toISOString()
          .replace(/T/, ' ')
          .replace(/[.]\d+Z/, ''),
        arrived: false,
        photo: faker.image.avatar(),
        attributes: ['sunglasses', 'polo shirt'],
      },
    ],
  };
  for (let i = 11; i < 31; i++) {
    attributes = [];
    for (let j = 0; j < faker.datatype.number(5); j++) {
      attributes.push(faker.commerce.product());
    }

    data.vips.push({
      id: i,
      name: faker.name.findName(),
      country_of_origin: faker.address.country(),
      eta: faker.date
        .soon(1)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/[.]\d+Z/, ''),
      arrived: faker.datatype.boolean(),
      photo: faker.image.avatar(),
      attributes,
    });
  }
  return data;
};
