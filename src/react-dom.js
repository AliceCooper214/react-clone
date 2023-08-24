import { REACT_ELEMENT, REACT_FORWARD_REF } from "./utils";
import { addEvent } from "./event";

function render(VNode, containerDOM) {
  mount(VNode, containerDOM);
}

function mount(VNode, containerDOM) {
  let newDOM = createDOM(VNode);
  newDOM && containerDOM.appendChild(newDOM);
}

function createDOM(VNode) {
  if (!VNode) return;
  const { type, props, ref } = VNode;
  let dom;
  if (
    typeof type === "function" &&
    type.IS_CLASS_COMPONENT &&
    VNode.$$typeof === REACT_ELEMENT
  ) {
    return getDomByClassComponent(VNode);
  } else if (typeof type === "function" && VNode.$$typeof === REACT_ELEMENT) {
    return getDomByFunctionComponent(VNode);
  } else if (type && type.$$typeof === REACT_FORWARD_REF) {
    return getDomByRefForwardFunction(VNode);
  } else if (type && VNode.$$typeof === REACT_ELEMENT) {
    dom = document.createElement(type);
  }
  if (props) {
    if (typeof props.children === "object" && props.children.type) {
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      mountArray(props.children, dom);
    } else if (typeof props.children === "string") {
      dom.appendChild(document.createTextNode(props.children));
    }
  }
  setPropsForDOM(dom, props);
  VNode.dom = dom;
  ref && (ref.current = dom);
  return dom;
}

export function updateDomTree(oldDOM, newVNode) {
  if (!oldDOM) return;
  let parentNode = oldDOM.parentNode;
  parentNode.removeChild(oldDOM);
  parentNode.appendChild(createDOM(newVNode));
}

export function findDomByVNode(VNode) {
  if (!VNode) return;
  if (VNode.dom) return VNode.dom;
}

function getDomByRefForwardFunction(vNode) {
  let { type, props, ref } = vNode;
  let renderVDom = type.render(props, ref);
  if (!renderVDom) return null;
  return createDOM(renderVDom);
}

function getDomByClassComponent(vNode) {
  let { type, props, ref } = vNode;
  let instance = new type(props);
  ref && (ref.current = instance);
  let renderVNode = instance.render();
  instance.oldVNode = renderVNode;
  if (!renderVNode) return null;
  return createDOM(renderVNode);
}

function getDomByFunctionComponent(VNode) {
  let { type, props, ref } = VNode;
  let renderVNode = type(props, ref);
  if (!renderVNode) return null;
  return createDOM(renderVNode);
}

function setPropsForDOM(dom, VNodeProps = {}) {
  if (!dom) return;
  for (let key in VNodeProps) {
    if (key === "children") continue;
    if (/^on[A-Z].*/.test(key)) {
      addEvent(dom, key.toLowerCase(), VNodeProps[key]);
    } else if (key === "style") {
      Object.keys(VNodeProps[key]).forEach((styleName) => {
        dom.style[styleName] = VNodeProps[key][styleName];
      });
    } else {
      dom[key] = VNodeProps[key];
    }
  }
}

function mountArray(children, parent) {
  if (!Array.isArray(children)) return;
  for (let i = 0; i < children.length; i++) {
    if (typeof children[i] === "string") {
      parent.appendChild(document.createTextNode(children[i]));
    } else {
      mount(children[i], parent);
    }
  }
}

export default {
  render,
};
