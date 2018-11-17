import { Container, interaction } from "pixi.js";
import Arc, { ArcProps } from "./Arc";

export type PieProps = Array<ArcProps>;

export default class Pie extends Container {
  radius: number;
  children: Array<Arc>;
  props: PieProps;

  constructor() {
    super();
    this.interactive = true;
    this.on("added", this.onAdded);
    this.on("mouseover", this.onMouseOver);
    this.on("mouseout", this.onMouseOut);
  }

  render(props?: PieProps) {
    if (props) {
      this.props = props;
    }
    if (!this.props) {
      return;
    }

    this.removeChildren();
    this.props.reduce((current: number, p: ArcProps) => {
      const arc = new Arc();
      arc.on("TOOLTIP_START", this.onTooltipStart);
      arc.on("TOOLTIP_MOVE", this.onTooltipMove);
      arc.on("TOOLTIP_END", this.onTooltipEnd);
      arc.render(this.radius, current, p);
      this.addChild(arc);
      return current + p.ratio;
    }, 0);
  }

  onAdded = () => {
    this.on("STAGE_RESIZE", this.onStageResize);
  };

  onStageResize = ({ width, height }: { width: number; height: number }) => {
    this.radius = Math.min(width, height) / 2;
    this.x = width / 2;
    this.y = height / 2;
    this.render(this.props);
  };

  onMouseOver = (e: interaction.InteractionEvent) => {
    this.emit("TOOLTIP_START", {
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
  };

  onTooltipStart = (e: ArcProps) => {
    this.emit("TOOLTIP_MOVE", e);
  };

  onTooltipMove = (e: ArcProps) => {
    this.emit("TOOLTIP_MOVE", e);
  };

  onTooltipEnd = (e: ArcProps) => {
    this.emit("TOOLTIP_MOVE", e);
  };
}
