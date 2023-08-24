export const REACT_ELEMENT = Symbol("react.element");
export const REACT_TEXT = Symbol("react.text");
export const REACT_FORWARD_REF = Symbol("react.forward_ref");

export const MOVE = Symbol("dom.diff.move"); //
export const CREATE = Symbol("dom.diff.create"); //
export const toVNode = (node) =>
  typeof node === "string" || typeof node === "number"
    ? {
        //
        type: REACT_TEXT,
        props: { text: node }, //
      }
    : node; //

const isNumberOrString = (element) =>
  typeof element === "number" || typeof element === "string";

export const wrapVDom = (vDom) =>
  isNumberOrString(vDom) ? { type: REACT_TEXT, props: vDom } : vDom;
