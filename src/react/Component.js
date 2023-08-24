// Component.js
import { updateDomTree, findDomByVNode } from "../react-dom";

export let updaterQueue = {
  isBatch: false,
  updaters: new Set(),
};
export function flushUpdaterQueue() {
  updaterQueue.isBatch = false;
  for (let updater of updaterQueue.updaters) {
    updater.launchUpdate();
  }
  updaterQueue.updaters.clear();
}
class Updater {
  /**
   *
   * @param {Component} ClassComponentInstance
   */
  constructor(ClassComponentInstance) {
    this.ClassComponentInstance = ClassComponentInstance;
    this.pendingStates = [];
  }
  addState(partialState) {
    this.pendingStates.push(partialState);
    this.preHandleForUpdate();
  }
  preHandleForUpdate() {
    if (updaterQueue.isBatch) {
      updaterQueue.updaters.add(this);
    } else {
      this.launchUpdate();
    }
  }
  launchUpdate() {
    const { ClassComponentInstance, pendingStates } = this;
    if (pendingStates.length === 0) return;
    ClassComponentInstance.state = this.pendingStates.reduce(
      (preState, newState) => {
        return {
          ...preState,
          ...newState,
        };
      },
      this.ClassComponentInstance.state
    );
    this.pendingStates.length = 0;
    ClassComponentInstance.update();
  }
}
export class Component {
  static IS_CLASS_COMPONENT = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updater = new Updater(this);
  }
  setState(partialState) {
    this.updater.addState(partialState);
  }
  update() {
    let oldVNode = this.oldVNode;
    let oldDOM = findDomByVNode(oldVNode);
    let newVNode = this.render();
    updateDomTree(oldVNode, newVNode, oldDOM);
    this.oldVNode = newVNode;
  }
  render() {
    throw new Error("please implement this method");
  }
}
