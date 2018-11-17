import { Container, interaction } from "pixi.js";
import Arc, { ArcData } from "./Arc";

const { PI } = Math;

export type PieProps = {
  radiusRatioFrom: number;
  radiusRatioTo: number;
  angleFrom: number;
  angleVolume: number;
};
export type PieData = Array<ArcData>;

export default class Pie extends Container {
  radius: number;
  children: Array<Arc>;
  props: PieProps;
  data: PieData;

  constructor({
    radiusRatioFrom = 0,
    radiusRatioTo = 1,
    angleFrom = -PI * 0.5,
    angleTo = PI * 1.5,
  }: {
    radiusRatioFrom?: number;
    radiusRatioTo?: number;
    angleFrom?: number;
    angleTo?: number;
  } = {}) {
    super();
    this.props = {
      radiusRatioFrom: radiusRatioFrom,
      radiusRatioTo: radiusRatioTo,
      angleFrom: angleFrom,
      angleVolume: angleTo - angleFrom,
    };
    this.interactive = true;
    this.on("added", this.onAdded);
    this.on("mouseover", this.onMouseOver);
    this.on("mouseout", this.onMouseOut);
  }

  render(data?: PieData) {
    if (data) {
      this.data = data;
    }
    if (!this.data) {
      return;
    }

    const {
      radiusRatioFrom,
      radiusRatioTo,
      angleFrom,
      angleVolume,
    } = this.props;

    this.removeChildren();
    this.data.reduce((angleRatioFrom: number, d: ArcData) => {
      const angleRatioTo = angleRatioFrom + d.ratio;
      const arc = new Arc();
      arc.render(
        {
          radiusFrom: this.radius * radiusRatioFrom,
          radiusTo: this.radius * radiusRatioTo,
          angleFrom: angleFrom + angleVolume * angleRatioFrom,
          angleTo: angleFrom + angleVolume * angleRatioTo,
        },
        d,
      );
      arc.on("TOOLTIP_START", this.onTooltipStart);
      arc.on("TOOLTIP_MOVE", this.onTooltipMove);
      arc.on("TOOLTIP_END", this.onTooltipEnd);
      this.addChild(arc);
      return angleRatioTo;
    }, 0);
  }

  onAdded = () => {
    this.on("STAGE_RESIZE", this.onStageResize);
  };

  onStageResize = ({ width, height }: { width: number; height: number }) => {
    this.radius = Math.min(width, height) / 2;
    this.x = width / 2;
    this.y = height / 2;
    this.render(this.data);
  };

  onMouseOver = (e: interaction.InteractionEvent) => {
    this.emit("TOOLTIP_START", {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      data: this.data,
    });
  };

  onMouseOut = (e: interaction.InteractionEvent) => {
    this.emit("TOOLTIP_END", {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      data: this.data,
    });
  };

  onTooltipStart = (e: ArcData) => {
    this.emit("TOOLTIP_MOVE", e);
  };

  onTooltipMove = (e: ArcData) => {
    this.emit("TOOLTIP_MOVE", e);
  };

  onTooltipEnd = (e: ArcData) => {
    this.emit("TOOLTIP_MOVE", e);
  };
}
