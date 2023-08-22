import { REACT_ELEMENT } from "../utils";
import { Component } from "./Component";

function createElement(type, properties = {}, children) {
  let ref = properties.ref || null;
  let key = properties.key || null;

  ["ref", "key", "__self", "__source"].forEach((key) => {
    delete properties[key];
  });

  properties._owner = null;
  properties._store = {};

  let props = { ...properties };

  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2);
  } else {
    props.children = children;
  }

  return {
    $$typeof: REACT_ELEMENT,
    type,
    ref,
    key,
    props,
  };
}

export default {
  createElement,
  Component,
};
