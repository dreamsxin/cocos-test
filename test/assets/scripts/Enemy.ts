
const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    public life = 100;
    public progress = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.progress = this.node.getChildByName('progress').getComponent(cc.ProgressBar);
    }

    start() {

    }

    // update (dt) {}

    onBeginContact(contact, selfCollider, otherCollider) {
        this.life = this.life - 10;
        this.setProgress(this.life);
    }

    public setProgress(life: number) {
        this.progress.progress = life / 100;
    }
}
