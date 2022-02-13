import EventCenter from "../FrameWork/EventFrameWork/EventCenter";
import { EventType } from "../FrameWork/EventFrameWork/EventType";
import Global from "./Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EventMgr extends cc.Component {

    onLoad () {
        
    }

    start () {
        EventCenter.Instance(EventCenter).addListener(EventType.select,this.select,Global.Instance(Global).eventNode);
    }

    // update (dt) {}

    protected onDestroy(): void {
        EventCenter.Instance(EventCenter).removeListener(EventType.select,this.select,Global.Instance(Global).eventNode);
    }

    public select(node:cc.Node){
        let jiantou = node.getChildByName('jiantou');
        if(jiantou.active == false){
            jiantou.active = true;
        }
    }
}
