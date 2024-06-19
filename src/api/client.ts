import { Question } from "../types/index";
import unreliableAxios from "./unreliableAxios";

export default class APIClient {
  baseURL: string;
  getCategories: any;

  constructor(params: { baseURL: string }) {
    if (!params.baseURL) throw new Error("NO_API_BASE_URL_FOUND");
    this.baseURL = params.baseURL;
  }

  public async getQuestions(amount: string, category: string, difficulty: string, type: string) {
    const res = await unreliableAxios.get(
      `${this.baseURL}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    );

    return res.data.results as Question[];
  }
}
