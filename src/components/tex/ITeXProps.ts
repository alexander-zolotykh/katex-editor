export interface ITeXProps {
  doneText: string;
  cancelText: string;
  formula: string;
  readonly?: boolean;
  onCancel?(): void;
  onApply(formula: string): void;
}
