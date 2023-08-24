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
    let bindFunction = target.attach && target.attach[eventName];
    bindFunction && bindFunction(syntheticEvent);
    if (syntheticEvent.isPropagationStopped) {
      break;
    }
    target = target.parentNode;
  }

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

  return syntheticEvent;
}
