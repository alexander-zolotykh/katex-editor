import React from "react";

import { storiesOf } from "@storybook/react";
import { observable } from "mobx";
import { observer } from "mobx-react";

import { KatexEditor } from "../dist";

let formula = observable.box("a+b/12*A");

const onChangeFormula = (nextFormula) => {
  formula.set(nextFormula);
}

const KatexEditorReactiveComponent = observer(() => <KatexEditor formula={formula.get()} onChange={onChangeFormula} />);

storiesOf("Katex Editor", module).add("main", () => {
  return <KatexEditorReactiveComponent/>;
});
