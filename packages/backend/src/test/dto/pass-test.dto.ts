export interface PassTestDto {
  answers: {
    questionId: string;
    selected: string[];
  } [];
  timer: number;
}
