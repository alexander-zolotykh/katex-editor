export interface ITeXProps {
  doneText: string;
  cancelText: string;
  formula: string;
  onCancel?(): void;
  onApply(formula: string): void;
}
