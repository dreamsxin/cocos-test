import FSMState, { StateID, Transition } from "../../FrameWork/FSMFrameWork/FSMState";
import FSMSystem from "../../FrameWork/FSMFrameWork/FSMSystem";
import DragonBonesMgr from "../DragonBonesMgr";
import Global from "../Global";

export default class MoveStateW extends FSMState {
    public storePos: cc.Vec3 = null;

    constructor(fsm: FSMSystem) {
        super(fsm);
        this.stateID = StateID.move;
    }
    public Act(npc: cc.Node): void {
        // console.log('移動');
        DragonBonesMgr.Instance(DragonBonesMgr).playAnimation(npc, 'aim', 0);
    }
    public Reason(npc: cc.Node): void {
        if (Global.Instance(Global).attackEnemyWuKong) {
            Global.Instance(Global).attackEnemyWuKong = false;
            this.fsm.performTransition(Transition.attackEnemy);
        }
        if (Global.Instance(Global).hitEnemyWuKong) {
            Global.Instance(Global).hitEnemyWuKong = false;
            let random = Math.random();
            if (random > 0.5) {
                this.fsm.performTransition(Transition.hitEnemy);
            }
            else {
                this.fsm.performTransition(Transition.hitYun);
            }
        }
        if (this.storePos != null && Math.floor(this.storePos.x) == Math.floor(npc.parent.position.x) && Math.floor(this.storePos.y) == Math.floor(npc.parent.position.y)) {
            this.fsm.performTransition(Transition.stopAction);
            this.storePos = null;
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
