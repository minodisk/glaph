import { Graphics, interaction } from "pixi.js";

const { sin, cos } = Math;

export type ArcProps = {
  radiusFrom: number;
  radiusTo: number;
  angleFrom: number;
  angleTo: number;
};

export type ArcData = {
  ratio: number;
  color: number;
  payload: any;
};

export default class Arc extends Graphics {
  data: ArcData;

  constructor() {
    super();
    this.interactive = true;
    this.on("mouseover", this.onMouseOver);
  }

  render(
    { radiusFrom, radiusTo, angleFrom, angleTo }: ArcProps,
    data: ArcData
  ) {
    this.data = data;
    this.beginFill(data.color);
    if (radiusFrom === 0) {
      this.moveTo(0, 0);
      this.arc(0, 0, radiusTo, angleFrom, angleTo);
    } else {
      const fromX = radiusTo * cos(angleFrom);
      const fromY = radiusTo * sin(angleFrom);
      this.moveTo(fromX, fromY);
      this.arc(0, 0, radiusTo, angleFrom, angleTo);
      this.lineTo(radiusFrom * cos(angleTo), radiusFrom * sin(angleTo));
      this.arc(0, 0, radiusFrom, angleTo, angleFrom, true);
      this.lineTo(fromX, fromY);
    }
    this.endFill();
  }

  onMouseOver = (e: interaction.InteractionEvent) => {
    this.emit("TOOLTIP_START", {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      data: this.data
    });
    this.off("mouseover", this.onMouseOver);
    this.on("mousemove", this.onMouseMove);
    this.on("mouseout", this.onMouseOut);
  };

  onMouseMove = (e: interaction.InteractionEvent) => {
    this.emit("TOOLTIP_MOVE", {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      data: this.data
    });
  };

  onMouseOut = (e: interaction.InteractionEvent) => {
    this.emit("TOOLTIP_END", {
      cursorX: e.data.global.x,
      cursorY: e.data.global.y,
      data: this.data
    });
    this.on("mouseover", this.onMouseOver);
    this.off("mousemove", this.onMouseMove);
    this.off("mouseout", this.onMouseOut);
  };
}
