import { Question } from "../types/index";
import unreliableAxios from "./unreliableAxios";
import { decodeHtmlEntities } from "../utils/decodeHtmlEntities"; // Import the utility function

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

  public async getQuestions(
    amount: string,
    category: string,
    difficulty: string,
    type: string
  ) {
    try {
      const res = await unreliableAxios.get(
        `${this.baseURL}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
      );
      const questions = res.data.results as Question[];
      return questions.map((question) => ({
        ...question,
        question: decodeHtmlEntities(question.question),
        correct_answer: decodeHtmlEntities(question.correct_answer),
        incorrect_answers: question.incorrect_answers.map((answer) =>
          decodeHtmlEntities(answer)
        ),
      }));
    } catch (error) {
      throw new Error("Failed to fetch questions"); // Handle error or retry logic here if needed
    }
  }
}
