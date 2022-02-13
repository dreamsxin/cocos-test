import Global from "./Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMgr extends cc.Component {
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {
        Global.Instance(Global).init();
    }

    // update (dt) {}
}
