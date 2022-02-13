import FSMState, { StateID, Transition } from "../../FrameWork/FSMFrameWork/FSMState";
import FSMSystem from "../../FrameWork/FSMFrameWork/FSMSystem";
import DragonBonesMgr from "../DragonBonesMgr";
import Global from "../Global";

export default class IdleStateW extends FSMState {

    constructor(fsm: FSMSystem) {
        super(fsm);
        this.stateID = StateID.idle;
    }

    public Act(npc: cc.Node): void {
        // console.log("待機");
        DragonBonesMgr.Instance(DragonBonesMgr).playAnimation(npc, 'idle', 0);
    }

    public Reason(npc: cc.Node): void {
        if (Global.Instance(Global).touchWuKong) {
            Global.Instance(Global).touchWuKong = false;
            this.fsm.performTransition(Transition.selectPlayer);
        }

    }

    public DoBeforeEntering(): void {

    }

    public DoAfterLeaving(): void {

    }


}
