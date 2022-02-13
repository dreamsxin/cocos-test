import Singleton from "../FrameWork/EventFrameWork/Singleton";

export default class DragonBonesMgr extends Singleton {

    /**
     * 
     * @param node 
     * @param animationName 
     * @param time 0为无限次数
     */
    public playAnimation(node:cc.Node,animationName:string,time:number){
        if(node.getComponent(dragonBones.ArmatureDisplay).animationName != animationName){
            node.getComponent(dragonBones.ArmatureDisplay).playAnimation(animationName,time);
        }
        // node.getComponent(dragonBones.ArmatureDisplay).once(eventName,callBack);
    }
}
