
import Singleton from "../FrameWork/EventFrameWork/Singleton";
export default class Global extends Singleton {

    public eventNode = null;

    public init(){
        this.eventNode = cc.find("Canvas/eventNode");
    }
    public touchTangseng = false;
    public touchTangsengEnd = false;
    public attackEnemyTangseng = false;
    public attackEnemyEndTangseng = false;
    public hitEnemyTangseng = false;
    public hitEndEnemyTangseng = false;

    public touchWuKong = false;
    public touchWuKongEnd = false;
    public attackEnemyWuKong = false;
    public attackEnemyEndWuKong = false;
    public hitEnemyWuKong = false;
    public hitEndEnemyWuKong = false;

}
