import FSMState, { StateID, Transition } from "../../FrameWork/FSMFrameWork/FSMState";
import FSMSystem from "../../FrameWork/FSMFrameWork/FSMSystem";
import DragonBonesMgr from "../DragonBonesMgr";
import Global from "../Global";

export default class SelectState extends FSMState {
    constructor(fsm: FSMSystem) {
        super(fsm);
        this.stateID = StateID.select;
    }
    public Act(npc: cc.Node): void {
        // console.log('選擇');
        let tangsengNode = npc.parent;
        if(tangsengNode.getChildByName('jiantou').active){
            DragonBonesMgr.Instance(DragonBonesMgr).playAnimation(npc,'select',1);
        }
    }
    public Reason(npc: cc.Node): void {
        if(Global.Instance(Global).touchTangsengEnd){
            Global.Instance(Global).touchTangsengEnd = false;
            this.fsm.performTransition(Transition.playerMove);
        }
    }
    public DoBeforeEntering(): void {

    }
    public DoAfterLeaving(): void {

    }


}
