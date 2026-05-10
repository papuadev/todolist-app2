export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  created_at: number;
};

export type FilterType = "all" | "active" | "completed";

export type TodoInputProps = {
  onAdd: (text: string) => void;
};

export type SortOrder = "newest" | "oldest";
