export default class API {
  constructor() {}
  async getFoodData(foodname) {
    const res = await fetch(
      `https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${foodname}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "8c08f37b1amsh53c64da8656444dp15a1a1jsn28286d4735c2",
          "x-rapidapi-host": "calorieninjas.p.rapidapi.com",
        },
      }
    );

    return res;
  }
}
