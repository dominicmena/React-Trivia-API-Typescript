import APIClient from "../api/client";
import Placeholder from "../components/Placeholder";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

type Props = {
  apiClient: APIClient;
};

const DIFFICULTY = "medium"; // Default difficulty
const TYPE = "multiple"; // Default type

const queryClient = new QueryClient();

export default function HomeContainer(props: Props) {
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] = useState<number>(5);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('9'); // Default category ID for General Knowledge
  const [gameStarted, setGameStarted] = useState(false);

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

  const handleRestartGame = () => {
    setGameStarted(false);
    setSelectedCategory('9'); // Reset to default category ID
    setSelectedNumberOfQuestions(5);
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

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
