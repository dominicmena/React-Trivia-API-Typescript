import APIClient from "../api/client";
import Placeholder from "../components/Placeholder";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import Flex from "../componentLibrary/Flex";

type Props = {
  apiClient: APIClient;
};

type GameHistory = {
  category: string;
  score: number; 
  timestamp: string;
}

const DIFFICULTY = "medium"; // Default difficulty
const TYPE = "multiple"; // Default type

const queryClient = new QueryClient();

export default function HomeContainer(props: Props) {
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] =
    useState<number>(5);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("9"); // Default category ID for General Knowledge
  const [gameStarted, setGameStarted] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([
    {score: 1, category: "History", timestamp: new Date().toISOString()},
    {score: 2, category: "Trivia", timestamp: new Date().toISOString()},
    {score: 3, category: "Something", timestamp: new Date().toISOString()}
  ])

  const updateGameHistory = (score: number) => {
    const timestamp = new Date().toISOString();
    const category = categories.find((cat: {id: number, name: string}) => cat.id.toString() === selectedCategory)?.name 
    const newGame = { category, score, timestamp }
    setGameHistory((prevHistory) => [...prevHistory, newGame])
  }

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => props.apiClient.getCategories(),
  });

  const {
    data: questions = [],
    isLoading: isLoadingQuestions,
    refetch: refetchQuestions,
  } = useQuery({
    queryKey: ["questions", selectedNumberOfQuestions, selectedCategory],
    queryFn: () =>
      props.apiClient.getQuestions(
        String(selectedNumberOfQuestions),
        selectedCategory ?? "11",
        DIFFICULTY,
        TYPE
      ),
    enabled: false, // Initially disabled
  });

  const handleStartGame = () => {
    setGameStarted(true);
    refetchQuestions();
  };

  const handleRestartGame = (score: number) => {
    setGameStarted(false);
    setSelectedCategory("9"); // Reset to default category ID
    setSelectedNumberOfQuestions(5);
    updateGameHistory(score)
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSelectNumberOfQuestions = (number: number) => {
    setSelectedNumberOfQuestions(number);
  };

  if (isLoadingQuestions || isLoadingCategories) {
    return "Loading...";
  }

  const logCorrectAnswer = (questionIndex: number) => {
    const currentQuestion = questions[questionIndex];
    console.log("Correct answer:", currentQuestion.correct_answer);
  };

  console.log({gameHistory})

  return (
    <QueryClientProvider client={queryClient}>
      <Flex>
        <div>
    <h3>Previous Game stats </h3>
    <ul>
      {gameHistory.map((gameHistory: GameHistory, index: number) => (
        <li key={index}>
          {gameHistory.timestamp} - Category: {gameHistory.category}, Score: {gameHistory.score}
        </li>
      ))}
      </ul>
      </div>
      <Placeholder
        questions={questions}
        categories={categories}
        onSelectCategory={handleSelectCategory}
        onSelectNumberOfQuestions={handleSelectNumberOfQuestions}
        onStartGame={handleStartGame}
        onRestartGame={handleRestartGame}
        logCorrectAnswer={logCorrectAnswer}
        selectedNumberOfQuestions={selectedNumberOfQuestions}
        selectedCategory={selectedCategory}
        gameStarted={gameStarted}
      />
      </Flex>
    </QueryClientProvider>
  );
}
