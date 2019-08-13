import classNames from "classnames";
import { autobind } from "core-decorators";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { Component } from "react";
import { InlineMath } from "react-katex";
import { ITeXProps } from "./ITeXProps";
import theme from "./styles.module.css";
import EventListener from 'react-event-listener';

@observer
@autobind
export class TeX extends Component<ITeXProps> {
  private readonly rootRef = React.createRef<HTMLDivElement>();
  private readonly textAreaRef = React.createRef<HTMLTextAreaElement>();

  @observable formula = "a+b";
  @observable isTextAreaFocused = false;
  @observable isEditing = false;

  componentDidMount(): void {
    this.syncProps();
  }

  componentDidUpdate(): void {
    this.syncProps();
  }

  private syncProps(): void {
    if (!this.isTextAreaFocused) {
      this.formula = this.props.formula;
    }
  }

  render(): React.ReactNode {
    const { doneText, cancelText, readonly } = this.props;

    const className = this.isEditing ? classNames(theme.tex, theme.activeTeX) : theme.tex;
    const invalidTeX = false;

    let editPanel = null;

    if (this.isEditing && !readonly) {
      const output = invalidTeX ? (
        <div className={theme.errorMessage}>Formula input error</div>
      ) : (
        <InlineMath>{this.formula}</InlineMath>
      );

      const okButtonTitle = invalidTeX ? "Invalid KaTeX syntax, please correct your formula first" : "Apply formula";

      const textAreaClassNames = classNames(theme.texValue, theme["texValue--textarea"]);
      const textAreaEmulatorClassNames = classNames(theme.texValue, theme["texValue--emulator"]);

      editPanel = (
        <div className={theme.panel}>
          <div className={theme.relative}>
            <div className={textAreaEmulatorClassNames}>{this.formula}</div>
            <textarea
              ref={this.textAreaRef}
              className={textAreaClassNames}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={this.formula}
            />

            <div className={theme.panelOutput}>{output}</div>
          </div>
          <div className={theme.footer}>
            <a
              href="https://mathlive.io/deploy/reference.html"
              onClick={this.onClickExternalLink}
              className={theme.link}
              title="Open syntax documentation in new window"
            >
              Syntax
            </a>

            <div className={theme.buttons}>
              <button
                type="button"
                className={theme.button}
                onClick={this.onCancel}
                title="Cancel editing and close modal"
              >
                {cancelText}
              </button>

              <button
                type="button"
                className={theme.button}
                disabled={invalidTeX}
                onClick={this.onApply}
                title={okButtonTitle}
              >
                {doneText}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div ref={this.rootRef} className={className}>
        <div className={"katex-static-output"} onClick={this.onClick}>
          <InlineMath>{this.formula}</InlineMath>
        </div>
        {editPanel}
        <EventListener
          target={"document"}
          onKeyDown={this.onKeyDown}
          onClick={this.onClickOutside}
        />
      </div>
    );
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.isEditing && !this.props.readonly) {
      if (event.key.toLowerCase() === "escape") {
        this.doCancel();
      } else if (event.key.toLowerCase() === "enter" && (event.metaKey || event.ctrlKey)) {
        this.doApply();
      }
    }
  }

  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLDivElement;
    const isClickAboveRootElement = target.contains(this.rootRef.current!);
    if (isClickAboveRootElement && this.isEditing && !this.props.readonly) {
      this.doCancel();
    }
  }

  onClick(event: React.MouseEvent<HTMLDivElement>): void {
    event.stopPropagation();
    this.show();
  }

  @action show(): void {
    if (!this.isEditing && !this.props.readonly) {
      this.isEditing = true;
    }
  }

  @action hide(): void {
    if (this.isEditing && !this.props.readonly) {
      this.isEditing = false;
    }
  }

  onFocus(): void {
    this.isTextAreaFocused = true;
  }

  onBlur(): void {
    this.isTextAreaFocused = false;
  }

  onChange(): void {
    this.formula = this.textAreaRef.current!.value;
  }

  onCancel(): void {
    this.doCancel();
  }

  doCancel(): void {
    this.formula = this.props.formula;
    this.hide();
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  onApply(): void {
    this.doApply();
  }

  doApply(): void {
    this.props.onApply(this.formula);
    this.hide();
  }

  // onKeyDown = (event) => {
  //     if ("Escape" === event.key) {
  //         this.onEsc();
  //     }
  // };

  // onClickOutside = (event) => {
  //     const { editMode } = this.state;

  //     if (editMode) {
  //         const { target } = event;
  //         const { current } = this.rootRef;

  //         const isOutside = target !== current && !current.contains(target);

  //         const { invalidTeX } = this.state;

  //         if (isOutside && !invalidTeX) {
  //             this.save();
  //         }
  //     }
  // };

  // onEsc = () => {
  //     this.cancel();
  // };

  // onClick = () => {
  //     const { editMode } = this.state;
  //     const { store } = this.props;
  //     if (editMode || store.getReadOnly()) {
  //         return;
  //     }
  //     this.setState(
  //         {
  //             editMode: true,
  //             ...this.getValue(),
  //         },
  //         () => {
  //             this.startEdit();
  //         },
  //     );
  // };

  // onValueChange = (evt) => {
  //     const { value } = evt.target;
  //     this.onMathInputChange(value);
  // };

  // onFocus = () => {
  //     if (this.callbacks.blur) {
  //         this.callbacks.blur();
  //     }
  // };

  // onMathInputChange = (inputValue) => {
  //     let invalid = false;
  //     const { katex, translator } = this.props;
  //     const value = translator(inputValue);
  //     try {
  //         katex.__parse(value); // eslint-disable-line no-underscore-dangle
  //     } catch (err) {
  //         invalid = err.message;
  //     } finally {
  //         this.setState({
  //             invalidTeX: invalid,
  //             value,
  //             inputValue,
  //         });
  //     }
  // };

  onClickExternalLink(event: React.MouseEvent<HTMLAnchorElement>): void {
    window.open((event.target as HTMLAnchorElement).href);
    event.preventDefault();
  }
}
