import * as React from "react";

export type colors = "red" | "green" | "blue" | "black" | "transparent";

export type styles = "dashed" | "solid";

export interface IBoxDebugOptions {
  color?: colors;
  style?: styles;
}

function getBgColor(color: colors) {
  switch (color) {
    case "red":
      return "#FF000055";
    case "green":
      return "#00FF0055";
    case "blue":
      return "#0000FF55";
    case "black":
      return "#00000055";
    case "transparent":
      return "transparent";
  }
}

function getBColor(color: colors) {
  switch (color) {
    case "red":
      return "#FF0000CC";
    case "green":
      return "#00FF00CC";
    case "blue":
      return "#0000FFCC";
    case "black":
      return "#222222";
    case "transparent":
      return "transparent";
  }
}

export interface IBoxProps {
  children?: any;
  color?: colors;
  style?: styles | undefined;
  borderColor: colors;
}

export const BoxBase = (props: IBoxProps) => (
  <div
    style={{
      display: "inline-block",
      padding: 10,
      margin: 10,
      minWidth: 20,
      minHeight: 20,
      backgroundColor: getBgColor(props.color || "black"),
      border: "solid",
      borderStyle: props.style || "dashed",
      borderWidth: 4,
      borderColor: getBColor(props.borderColor)
    }}
  >
    {props.children || null}
  </div>
);
