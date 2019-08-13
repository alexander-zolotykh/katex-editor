export interface IKatexEditorProps {
  formula: string;
  readonly?: boolean;
  onChange(formula: string): void;
}
