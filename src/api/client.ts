import { Question } from "../types";
import unreliableAxios from "./unreliableAxios";

// const AMOUNT = "5";
// const CATEGORY = "11";
// const DIFFICULTY = "medium";
// const TYPE = "multiple";

export default class APIClient {
  baseURL: string;

  constructor(params: { baseURL: string }) {
    if (!params.baseURL) throw new Error("NO_API_BASE_URL_FOUND");
    this.baseURL = params.baseURL;
  }

  public async getQuestions(params: {
    amount: string;
    category: string;
    difficulty: string;
    type: string; 
  }) {
    const { amount, category, difficulty, type} = params;
    const res = (await unreliableAxios.get(
      `${this.baseURL}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    )) as unknown as { data: { results: Question[] } };

    return res.data.results;
  }
}
