import FSMState, { StateID, Transition } from "../../FrameWork/FSMFrameWork/FSMState";
import FSMSystem from "../../FrameWork/FSMFrameWork/FSMSystem";
import DragonBonesMgr from "../DragonBonesMgr";

export default class YunState extends FSMState {

    public storePos: cc.Vec3 = null;
    constructor(fsm: FSMSystem) {
        super(fsm);
        this.stateID = StateID.yun;
    }
    public Act(npc: cc.Node): void {
        // console.log('暈');
        DragonBonesMgr.Instance(DragonBonesMgr).playAnimation(npc, 'yun', 1);
    }
    public Reason(npc: cc.Node): void {
        if (this.storePos != null && Math.floor(this.storePos.x) == Math.floor(npc.parent.position.x) && Math.floor(this.storePos.y) == Math.floor(npc.parent.position.y)) {
            this.storePos = null;
            setTimeout(() => {
                this.fsm.performTransition(Transition.stopAction);
            }, 2000);
        }
        else {
            this.storePos = npc.parent.position;
        }
    }
    public DoBeforeEntering(): void {

    }
    public DoAfterLeaving(): void {

    }

}
