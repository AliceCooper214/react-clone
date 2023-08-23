import { updaterQueue } from './react/Component.js'

export function addEvent(dom, eventName, bindFunction) {
    dom.attach = dom.attach || {}
    dom.attach[eventName] = bindFunction

    // 核心点 1/2: 事件绑定到document上
    if (document[eventName]) return
    document[eventName] = dispatchEvent;
}

function dispatchEvent(nativeEvent) {
    updaterQueue.isBathingUpdate = true;
}