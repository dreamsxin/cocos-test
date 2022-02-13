import EventCenter from "../FrameWork/EventFrameWork/EventCenter";
import { EventType } from "../FrameWork/EventFrameWork/EventType";
import Global from "./Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TangsengMgr extends cc.Component {

    public wukongNode = null;
    public jiantouNode = null;
    public eventID = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        // this.wukongNode = cc.find("Canvas/wukong");
        this.jiantouNode = this.node.getChildByName("jiantou");

        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
    }

    start() {
        // this.node.on('click',()=>{

        // })
    }

    protected onDestroy(): void {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this)
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
    }

    update (dt) {
        // console.log(this.node.getComponent(cc.RigidBody).linearVelocity);
    }

    public touchStart(event: cc.Event.EventTouch) {
        if (this.eventID != null && this.eventID != event.getID()) { return; }

        EventCenter.Instance(EventCenter).boradcast(Global.Instance(Global).eventNode, EventType.select, this.node);
        // this.wukongNode.getChildByName('jiantou').active = false;

        this.eventID = event.getID();

        let location = event.getLocation();//世界坐标

        this.followDegree(location);

        Global.Instance(Global).touchTangseng = true;

    }

    public touchMove(event: cc.Event.EventTouch) {
        if (this.eventID != null && this.eventID != event.getID()) { return; }

        let location = event.getLocation();
        this.followDegree(location);

        Global.Instance(Global).touchTangseng = true;
    }

    public touchEnd(event: cc.Event.EventTouch) {
        if (this.eventID != null && this.eventID != event.getID()) { return; }
        this.eventID = null;
        
        this.node.getComponent(cc.RigidBody).applyLinearImpulse(this.jiantouNode.parent.convertToNodeSpaceAR(event.getLocation()),
        this.node.getComponent(cc.RigidBody).getWorldCenter(),true);

        this.node.getChildByName('jiantou').active = false;
        
        Global.Instance(Global).touchTangsengEnd = true;
        Global.Instance(Global).touchTangseng = false;
    }

    public touchCancel(event: cc.Event.EventTouch) {
        if (this.eventID != null && this.eventID != event.getID()) { return; }
        this.eventID = null;

        this.node.getComponent(cc.RigidBody).applyLinearImpulse(this.jiantouNode.parent.convertToNodeSpaceAR(event.getLocation()),
        this.node.getComponent(cc.RigidBody).getWorldCenter(),true);

        this.node.getChildByName('jiantou').active = false;

        Global.Instance(Global).touchTangsengEnd = true;
        Global.Instance(Global).touchTangseng = false;
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
            Global.Instance(Global).attackEnemyTangseng = true;
        }

        if(otherCollider.name == 'wukong<PhysicsBoxCollider>'){
            Global.Instance(Global).hitEnemyTangseng = true;
        }
    }

    onEndContact(contact, selfCollider, otherCollider){
        if(otherCollider.name == 'enemy<PhysicsBoxCollider>'){
            Global.Instance(Global).attackEnemyEndTangseng = true;
        }

        if(otherCollider.name == 'wukong<PhysicsBoxCollider>'){
            Global.Instance(Global).hitEndEnemyTangseng = true;
        }
    }

    


}

