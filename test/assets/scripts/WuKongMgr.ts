import EventCenter from "../FrameWork/EventFrameWork/EventCenter";
import { EventType } from "../FrameWork/EventFrameWork/EventType";
import Global from "./Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WuKongMgr extends cc.Component {

    public wuKongNode = null;
    public jiantouNode = null;
    public eventID = null;
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        // this.wuKongNode = cc.find("Canvas/tangseng");
        this.jiantouNode = this.node.getChildByName('jiantou');

        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
    }

    start () {

    }

    protected onDestroy(): void {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this)
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
    }

    // update (dt) {}

    public touchStart(event: cc.Event.EventTouch) {
        if (this.eventID != null && this.eventID != event.getID()) { return; }

        EventCenter.Instance(EventCenter).boradcast(Global.Instance(Global).eventNode, EventType.select, this.node);
        // this.wuKongNode.getChildByName('jiantou').active = false;

        this.eventID = event.getID();

        let location = event.getLocation();//世界坐标

        this.followDegree(location);

        Global.Instance(Global).touchWuKong = true;

    }

    public touchMove(event: cc.Event.EventTouch) {
        if (this.eventID != null && this.eventID != event.getID()) { return; }

        let location = event.getLocation();
        this.followDegree(location);

        Global.Instance(Global).touchWuKong = true;
    }

    public touchEnd(event: cc.Event.EventTouch) {
        if (this.eventID != null && this.eventID != event.getID()) { return; }
        this.eventID = null;
        
        this.node.getComponent(cc.RigidBody).applyLinearImpulse(this.jiantouNode.parent.convertToNodeSpaceAR(event.getLocation()),
        this.node.getComponent(cc.RigidBody).getWorldCenter(),true);

        this.node.getChildByName('jiantou').active = false;

        Global.Instance(Global).touchWuKongEnd = true;
        Global.Instance(Global).touchWuKong = false;

    }

    public touchCancel(event: cc.Event.EventTouch) {
        if (this.eventID != null && this.eventID != event.getID()) { return; }
        this.eventID = null;

        this.node.getComponent(cc.RigidBody).applyLinearImpulse(this.jiantouNode.parent.convertToNodeSpaceAR(event.getLocation()),
        this.node.getComponent(cc.RigidBody).getWorldCenter(),true);

        this.node.getChildByName('jiantou').active = false;

        Global.Instance(Global).touchWuKongEnd = true;
        Global.Instance(Global).touchWuKong = false;
    }

    public followDegree(location:cc.Vec2){
        let nodeLocation = this.jiantouNode.parent.convertToNodeSpaceAR(location);
        let r = Math.atan2(nodeLocation.x, nodeLocation.y);
        let degree = r * 180 / (Math.PI);
        this.jiantouNode.angle = -degree;
    }

    onBeginContact(contact, selfCollider, otherCollider) {
        // console.log(otherCollider.name == 'enemy<PhysicsBoxCollider>');
        if(otherCollider.name == 'enemy<PhysicsBoxCollider>'){
            Global.Instance(Global).attackEnemyWuKong = true;
        }

        if(otherCollider.name == 'tangseng<PhysicsBoxCollider>'){
            Global.Instance(Global).hitEnemyWuKong = true;
        }
    }

    onEndContact(contact, selfCollider, otherCollider){
        if(otherCollider.name == 'enemy<PhysicsBoxCollider>'){
            Global.Instance(Global).attackEnemyEndWuKong = true;
        }

        if(otherCollider.name == 'tangseng<PhysicsBoxCollider>'){
            Global.Instance(Global).hitEndEnemyWuKong = true;
        }
    }

    

}
