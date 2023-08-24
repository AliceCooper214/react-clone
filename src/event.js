import { flushUpdaterQueue, updaterQueue } from "./react/Component.js";

export function addEvent(dom, eventName, bindFunction) {
  dom.attach = dom.attach || {};
  dom.attach[eventName] = bindFunction;

  // 核心点 1/2: 事件绑定到document上
  if (document[eventName]) return;
  document[eventName] = dispatchEvent;
}

/**
 *
 * @param {Event} nativeEvent
 */
function dispatchEvent(nativeEvent) {
  updaterQueue.isBathingUpdate = true;

  let syntheticEvent = createSyntheticEvent(nativeEvent);

  let target = nativeEvent.target;

  // 冒泡处理
  while (target) {
    syntheticEvent.currentTarget = target;
    let eventName = `on${nativeEvent.type}`;
    let bindFunction = target.attach && target.attach[eventName];
    bindFunction && bindFunction(syntheticEvent);
    if (syntheticEvent.isPropagationStopped) {
      break;
    }
    target = target.parentNode;
  }

  // 批处理
  flushUpdaterQueue();
}

function createSyntheticEvent(nativeEvent) {
  let nativeEventKeyValues = {};
  for (let key in nativeEvent) {
    nativeEventKeyValues[key] =
      typeof nativeEvent[key] === "function"
        ? nativeEvent[key].bind(nativeEvent)
        : nativeEvent[key];
  }

  let syntheticEvent = Object.assign(nativeEventKeyValues, {
    nativeEvent,
    isDefaultPrevented: false,
    isPropagationStopped: false,
    preventDefault: function () {
      this.isDefaultPrevented = true;
      if (this.nativeEvent.preventDefault) {
        this.nativeEvent.preventDefault();
      } else {
        this.nativeEvent.returnValue = false;
      }
    },
    stopPropagation: function () {
      this.isPropagationStopped = true;
      if (this.nativeEvent.stopPropagation) {
        this.nativeEvent.stopPropagation();
      } else {
        this.nativeEvent.cancelBubble = true;
      }
    },
  });

  return syntheticEvent;
}
