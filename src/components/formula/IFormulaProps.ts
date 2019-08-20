export interface IFormulaProps {
    formula: string;
    readonly?: boolean;
    onChange(formula: string): void;
}
