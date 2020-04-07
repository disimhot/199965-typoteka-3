"use strict";

const fs = require(`fs`);

const {getRandomInt, shuffle} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const {
  titles,
  announces,
  categories,
} = require(`./constants/generateData.json`);

const getCurrentDateTime = () => {
  const date = new Date().toJSON().slice(0, 10);
  const time = new Date().toJSON().slice(11, 19);
  return `${date} ${time}`;
};

const generateOffers = (count) =>
  Array(count)
    .fill({})
    .map(() => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: shuffle(announces).slice(1, 5).join(` `),
      fullText: shuffle(announces).slice(1, announces.length - 1).join(` `),
      createdDate: getCurrentDateTime(),
      category: shuffle(categories).slice(
          0,
          getRandomInt(1, categories.length - 1),
      ),
    }));

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.log(`Can't write data to file...`);
      }

      return console.log(`Operation is successful. File is created.`);
    });
  },
};