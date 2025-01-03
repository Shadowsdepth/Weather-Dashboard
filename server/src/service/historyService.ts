import * as fs from 'fs/promises';

// TODO: Define a City class with name and id properties
class City {
  constructor(public id: string, public name: string) {}
}

class HistoryService {

  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  //private filePath = path.join(__dirname, '../../../data/searchHistory.json');

  private filePath = "db/db.json";

  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing to file', error);
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
    return await this.read();
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(city: City) {
    const cities = await this.read();
    cities.push(city);
    await this.write(cities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}

  async removeCity(id: string) {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();
