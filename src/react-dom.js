import { REACT_ELEMENT, REACT_FORWARD_REF, REACT_TEXT } from "./utils";
import { addEvent } from "./event";

function render(VNode, containerDOM) {
  mount(VNode, containerDOM);
}

function mount(vNode, containerDOM) {
  let newDOM = createDOM(vNode);
  newDOM && containerDOM.appendChild(newDOM);
}

function createDOM(vNode) {
  if (!vNode) return;
  const { type, props, ref } = vNode;
  let dom;

  if (
    typeof type === "function" &&
    type.IS_CLASS_COMPONENT &&
    vNode.$$typeof === REACT_ELEMENT
  ) {
    return getDomByClassComponent(vNode);
  } else if (typeof type === "function" && vNode.$$typeof === REACT_ELEMENT) {
    return getDomByFunctionComponent(vNode);
  } else if (type && type.$$typeof === REACT_FORWARD_REF) {
    return getDomByRefForwardFunction(vNode);
  } else if (type === REACT_TEXT) {
    dom = document.createTextNode(props.text);
  } else if (type && vNode.$$typeof === REACT_ELEMENT) {
    dom = document.createElement(type);
  }

  if (props) {
    if (typeof props.children === "object" && props.children.type) {
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      mountArray(props.children, dom);
    }
    // else if (typeof props.children === "string") {
    //   dom.appendChild(document.createTextNode(props.children));
    // }
  }
  setPropsForDOM(dom, props);
  vNode.dom = dom;
  ref && (ref.current = dom);
  return dom;
}

export function updateDomTree(oldVNode, newVNode, oldDOM) {
  const typeMap = {
    NO_OPERATE: !oldVNode && !newVNode,
    ADD: !oldVNode && newVNode,
    DELETE: oldVNode && !newVNode,
    REPLACE: oldVNode && newVNode && oldVNode.type !== newVNode.type,
  };
  let UPDATE_TYPE = Object.keys(typeMap).filter((key) => typeMap[key])[0];

  switch (UPDATE_TYPE) {
    case "NO_OPERATE":
      break;
    case "DELETE":
      removeVNode(oldVNode);
      break;
    case "ADD":
      oldDOM.parentNode.appendChild(createDOM(newVNode));
      break;
    case "REPLACE":
      removeVNode(oldVNode);
      oldDOM.parentNode.appendChild(createDOM(newVNode));
      break;
    default:
      deepDOMDiff(oldVNode, newVNode);
      break;
  }
}

function updateChildren(parentDOM, oldVNodeChildren, newVNodeChildren) {}

function deepDOMDiff(oldVNode, newVNode) {
  let diffTypeMap = {
    ORIGIN_NODE: typeof oldVNode.type === "string",
    CLASS_COMPONENT:
      typeof oldVNode.type === "function" && oldVNode.type.isReactComponent,
    FUNCTION_COMPONENT: typeof oldVNode.type === "function",
    TEXT: oldVNode.type === REACT_TEXT,
  };
  let DIFF_TYPE = Object.keys(diffTypeMap).filter((key) => diffTypeMap[key])[0];
  switch (DIFF_TYPE) {
    case "ORIGIN_NODE":
      let currentDOM = (newVNode.dom = findDomByVNode(oldVNode));
      setPropsForDOM(currentDOM, newVNode.props);
      updateChildren(
        currentDOM,
        oldVNode.props.children,
        newVNode.props.children
      );
      break;
    case "CLASS_COMPONENT":
      break;
    case "FUNCTION_COMPONENT":
      break;
    case "TEXT":
      newVNode.dom = findDomByVNode(newVNode);
      newVNode.dom.textContent = newVNode.props.text;
      break;
    default:
      break;
  }
}

export function findDomByVNode(VNode) {
  if (!VNode) return;
  if (VNode.dom) return VNode.dom;
}

function removeVNode(vNode) {
  const currentDOM = findDomByVNode(vNode);
  if (currentDOM) currentDOM.remove();
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
    // if (typeof children[i] === "string") {
    //   parent.appendChild(document.createTextNode(children[i]));
    // } else {
    //   mount(children[i], parent);
    // }
    children[i].index = i;
    mount(children[i], parent);
  }
}

export default {
  render,
};
