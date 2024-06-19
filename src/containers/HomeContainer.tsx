import APIClient from "../api/client";
import Placeholder from "../components/Placeholder";
import { useQuery } from "react-query";
import { useState } from "react";

type Props = {
  apiClient: APIClient;
};

export default function HomeContainer(props: Props) {
  const { data: questions = [], isLoading: isLoadingQuestions } = useQuery({
    queryKey: ["questions"],
    queryFn: () => props.apiClient.getQuestions(),
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => props.apiClient.getCategories(),
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] = useState<number>(5);

  function handleStartGame() {
    console.log("Start Game");
    // Further logic for starting the game can be added here
  }

  function handleSelectCategory(category: string) {
    console.log("Selected category:", category);
    setSelectedCategory(category);
    // Logic to filter questions based on selected category can be implemented here
  }

  function handleSelectNumberOfQuestions(number: number) {
    console.log("Selected number of questions:", number);
    setSelectedNumberOfQuestions(number);
    // Logic to limit the number of questions displayed can be implemented here
  }

  if (isLoadingQuestions || isLoadingCategories) {
    return "Loading...";
  }

  return (
    <Placeholder
      questions={questions}
      categories={categories}
      onSelectCategory={handleSelectCategory}
      onSelectNumberOfQuestions={handleSelectNumberOfQuestions}
      onStartGame={handleStartGame}
    />
  );
}
