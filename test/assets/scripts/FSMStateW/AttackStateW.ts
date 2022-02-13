import FSMState, { StateID, Transition } from "../../FrameWork/FSMFrameWork/FSMState";
import FSMSystem from "../../FrameWork/FSMFrameWork/FSMSystem";
import DragonBonesMgr from "../DragonBonesMgr";
import Global from "../Global";

export default class AttackStateW extends FSMState {

    public storePos: cc.Vec3 = null;
    constructor(fsm:FSMSystem){
        super(fsm);
        this.stateID = StateID.attack;
    }

    public Act(npc: cc.Node): void {
        // console.log("攻擊");
        DragonBonesMgr.Instance(DragonBonesMgr).playAnimation(npc, 'attack', 1);
    }

    public Reason(npc: cc.Node): void {
        if(Global.Instance(Global).attackEnemyEndWuKong){
            Global.Instance(Global).attackEnemyEndWuKong = false;
            if (this.storePos != null && Math.floor(this.storePos.x) == Math.floor(npc.parent.position.x) && Math.floor(this.storePos.y) == Math.floor(npc.parent.position.y)) {
                this.fsm.performTransition(Transition.stopAction);
                this.storePos = null;
            }
            else {
                this.fsm.performTransition(Transition.attackEnd);
            }
        }

    }

    public DoBeforeEntering(): void {
        
    }

    public DoAfterLeaving(): void {
        
    }

}
