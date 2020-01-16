const petfinder = require("@petfinder/petfinder-js");

const client = new petfinder.Client({
  apiKey: "EleUQUs9t8vtF8lIm7K3whOXqDumhTIw2Wo9r4uwxWFTnXP1VQ",
  secret: "1f7G1WupvYNO51Jf5vyueYCqvyOb3LjzoP7voWXs"
});

client.animal
  .search({ location: 95811, type: "dog", status: "adoptable", distance: 25 })
  .then(resp => {
    console.log(resp.data.animals[0]);
  });
