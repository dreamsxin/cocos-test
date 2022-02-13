import { StateID, Transition } from "../FrameWork/FSMFrameWork/FSMState";
import FSMSystem from "../FrameWork/FSMFrameWork/FSMSystem";
import AttackState from "./FSMState/AttackState";
import HitState from "./FSMState/HitState";
import IdleState from "./FSMState/IdleState";
import MoveState from "./FSMState/MoveState";
import SelectState from "./FSMState/SelectState";
import YunState from "./FSMState/YunState";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tangseng extends cc.Component {

    private fsm:FSMSystem;

    // onLoad () {}

    start () {
        this.initFSM();
    }

    update (dt) {
        this.fsm.onState(this.node);
    }

    public initFSM(){
        this.fsm = new FSMSystem();
        let idle = new IdleState(this.fsm);
        idle.addTransition(Transition.selectPlayer,StateID.select);
        let select = new SelectState(this.fsm);
        select.addTransition(Transition.playerMove,StateID.move);
        let move = new MoveState(this.fsm);
        move.addTransition(Transition.hitEnemy,StateID.hit);
        move.addTransition(Transition.attackEnemy,StateID.attack);
        move.addTransition(Transition.hitYun,StateID.yun);
        move.addTransition(Transition.stopAction,StateID.idle);
        let hit = new HitState(this.fsm);
        hit.addTransition(Transition.hitEnd,StateID.move);
        hit.addTransition(Transition.stopAction,StateID.idle);
        let attack = new AttackState(this.fsm);
        attack.addTransition(Transition.attackEnd,StateID.move);
        attack.addTransition(Transition.stopAction,StateID.idle);
        let yun = new YunState(this.fsm);
        yun.addTransition(Transition.stopAction,StateID.idle);
        this.fsm.addState(idle);
        this.fsm.addState(select);
        this.fsm.addState(move);
        this.fsm.addState(hit);
        this.fsm.addState(attack);
        this.fsm.addState(yun);
    }
}
