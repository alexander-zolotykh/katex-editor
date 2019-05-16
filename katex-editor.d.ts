declare module "katex-ediotr" {
  import * as React from "react";

  export interface IKatexEditorProps {
    formula: string;
    onChange(formula: string): void;
  }

  export class KatexEditor extends React.Component {}
}
