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
        photo:
          'https://img.olympicchannel.com/images/image/private/t_1-1_600/f_auto/v1538355600/primary/xvswt1wild3ewrxoruhx',
        attributes: ['red jacket indonesian team', 'blue jeans'],
      },
    ],
  };
  for (let i = 2; i < 30; i++) {
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
      attributes: [faker.commerce.product()],
    });
  }
  return data;
};
