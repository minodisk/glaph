import { Application } from "pixi.js";
import Tooltip, { TooltipRenderer } from "./tooltip/Tooltip";
import { TooltipEvent } from "./tooltip/TooltipEvent";
import Pie from "./pie/Pie";

export default class Chart {
  element: HTMLDivElement;
  stage: HTMLDivElement;
  app: Application;
  tooltip: Tooltip;
  tooltipRenderer: TooltipRenderer;
  obs: any;

  constructor(
    width: number | string = "100%",
    height: number | string = "100%",
  ) {
    this.app = new Application({
      antialias: true,
      // transparent: true,
    });
    this.app.renderer.autoResize = true;
    this.app.view.style.position = "absolute";

    this.stage = document.createElement("div");
    this.stage.style.width = "100%";
    this.stage.style.height = "100%";
    this.stage.style.overflow = "hidden";
    this.stage.style.position = "relative";
    this.stage.appendChild(this.app.view);

    this.tooltip = new Tooltip(this.tooltipRenderer);

    this.element = document.createElement("div");
    this.element.style.width = typeof width === "number" ? `${width}px` : width;
    this.element.style.height =
      typeof height === "number" ? `${height}px` : height;
    this.element.style.position = "relative";
    this.element.appendChild(this.stage);
    this.element.appendChild(this.tooltip.element);
    this.element.addEventListener("DOMNodeInsertedIntoDocument", this.onAppend);
  }

  addChart(body: Pie) {
    body.on("TOOLTIP_START", this.onTooltipStart);
    body.on("TOOLTIP_MOVE", this.onTooltipMove);
    body.on("TOOLTIP_END", this.onTooltipEnd);
    this.app.stage.addChild(body);
  }

  resize(width: number, height: number) {
    this.app.renderer.resize(width, height);
    this.app.stage.children.forEach(child =>
      child.emit("STAGE_RESIZE", { width, height }),
    );
  }

  onAppend = () => {
    this.element.removeEventListener(
      "DOMNodeInsertedIntoDocument",
      this.onAppend,
    );

    console.log("onAppend");
    const { width, height } = this.stage.getBoundingClientRect();
    this.resize(width, height);

    if ((window as any).ResizeObserver) {
      this.obs = new (window as any).ResizeObserver(this.onStageResize);
      this.obs.observe(this.stage);
    } else {
      window.addEventListener("resize", this.onWindowResize);
    }
  };

  onStageResize = ([{ contentRect: { width, height } }]: any) => {
    this.resize(width, height);
  };

  onWindowResize = () => {
    console.log("onWindowResize");
    const { width, height } = this.stage.getBoundingClientRect();
    this.resize(width, height);
  };

  onTooltipStart = (e: TooltipEvent) => {
    console.log("onTooltipStart", e);
    this.tooltip.moveTo(
      e.cursorX,
      e.cursorY,
      this.app.renderer.width,
      this.app.renderer.height,
    );
    this.tooltip.show();
  };

  onTooltipMove = (e: TooltipEvent) => {
    console.log("onTooltipMove", e);
    this.tooltip.render(e.data);
    this.tooltip.moveTo(
      e.cursorX,
      e.cursorY,
      this.app.renderer.width,
      this.app.renderer.height,
    );
  };

  onTooltipEnd = (e: TooltipEvent) => {
    console.log("onTooltipEnd", e);
    this.tooltip.moveTo(
      e.cursorX,
      e.cursorY,
      this.app.renderer.width,
      this.app.renderer.height,
    );
    this.tooltip.hide();
  };
}
