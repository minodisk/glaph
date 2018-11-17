import { Graphics, interaction } from "pixi.js";

const { PI } = Math;
const PI2 = PI * 2;
const BEGIN = -PI / 2;

export type ArcProps = {
  ratio: number;
  color: number;
  payload: any;
};

export default class Arc extends Graphics {
  props: ArcProps;

  constructor() {
    super();
    this.interactive = true;
    this.on("mouseover", this.onMouseOver);
  }

  render(radius: number, fromRatio: number, props: ArcProps) {
    this.props = props;
    this.beginFill(props.color);
    this.moveTo(0, 0);
    this.arc(
      0,
      0,
      radius,
      BEGIN + PI2 * fromRatio,
      BEGIN + PI2 * (fromRatio + props.ratio),
    );
    this.lineTo(0, 0);
    this.endFill();
  }

  onMouseOver = (e: interaction.InteractionEvent) => {
    this.emit("TOOLTIP_START", {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      props: this.props,
    });
    this.off("mouseover", this.onMouseOver);
    this.on("mousemove", this.onMouseMove);
    this.on("mouseout", this.onMouseOut);
  };

  onMouseMove = (e: interaction.InteractionEvent) => {
    this.emit("TOOLTIP_MOVE", {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      props: this.props,
    });
  };

  onMouseOut = (e: interaction.InteractionEvent) => {
    this.emit("TOOLTIP_END", {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      props: this.props,
    });
    this.on("mouseover", this.onMouseOver);
    this.off("mousemove", this.onMouseMove);
    this.off("mouseout", this.onMouseOut);
  };
}
