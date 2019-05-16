import { autobind } from "core-decorators";
import * as React from "react";
import { Formula } from "./components/formula";
import "katex/dist/katex.min.css";

interface IKatexEditorProps {
  formula: string;
  onChange(formula: string): void;
}

@autobind
export class KatexEditor extends React.Component<IKatexEditorProps> {
  render(): React.ReactNode {
    return (
      <div>
        <Formula formula={this.props.formula} onChange={this.props.onChange} />
      </div>
    );
  }
}
