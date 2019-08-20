import { autobind } from "core-decorators";
import * as React from "react";
import { Formula } from "./components/formula";
import { IKatexEditorProps } from "./IKatexEditorProps";
import "katex/dist/katex.min.css";
import "./styles.css";

@autobind
export class KatexEditor extends React.Component<IKatexEditorProps> {
  render(): React.ReactNode {
    return (
      <div>
        <Formula formula={this.props.formula} readonly={this.props.readonly} onChange={this.props.onChange} />
      </div>
    );
  }
}
