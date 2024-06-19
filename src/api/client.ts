import { Question } from "../types/index";
import unreliableAxios from "./unreliableAxios";

export default class APIClient {
  baseURL: string;

  constructor(params: { baseURL: string }) {
    if (!params.baseURL) throw new Error("NO_API_BASE_URL_FOUND");
    this.baseURL = params.baseURL;
  }

  public async getCategories() {
    const res = await unreliableAxios.get(`${this.baseURL}/api_category.php`);
    return res.data.trivia_categories; // Adjust according to actual API response structure
  }

  public async getQuestions(amount: string, category: string, difficulty: string, type: string) {
    try {
      const res = await unreliableAxios.get(
        `${this.baseURL}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
      );
      return res.data.results as Question[];
    } catch (error) {
      throw new Error("Failed to fetch questions"); // Handle error or retry logic here if needed
    }
  }
}
