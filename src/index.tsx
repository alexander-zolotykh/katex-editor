import { autobind } from "core-decorators";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { Formula } from "./components/formula";
import "katex/dist/katex.min.css";

@observer
@autobind
export class Main extends React.Component {
  @observable formula = "a+b/12*A";

  render(): React.ReactNode {
    return (
      <div>
        <Formula formula={this.formula} onChange={this.onChangeFormula} />
      </div>
    );
  }

  private onChangeFormula(formula: string): void {
    this.formula = formula;
  }
}
