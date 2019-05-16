import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import * as React from "react";
import { IFormulaProps } from "./IFormulaProps";
import { TeX } from "../tex";

@autobind
@observer
export class Formula extends React.Component<IFormulaProps> {
  render(): React.ReactNode {
    return (
      <div>
        <TeX
          formula={this.props.formula}
          doneText={"Ok"}
          cancelText={"Cancel"}
          onApply={this.onApply}
        />
      </div>
    );
  }

  onApply(formula: string): void {
    this.props.onChange(formula);
  }
}
