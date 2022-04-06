import {_decorator, AudioClip, AudioSource, game} from 'cc';
import {RenderManager} from "db://assets/Scripts/Base/RenderManager";
import DataManager from "db://assets/Scripts/Runtime/DataManager";
import {SceneEnum} from "db://assets/Scripts/Enum";

const {ccclass, property} = _decorator;

@ccclass('MusicManager')
export class MusicManager extends RenderManager {
    @property(AudioClip)
    public normalClip: AudioClip = null;

    @property(AudioClip)
    public gameClip: AudioClip = null;

    private curClip: AudioClip = null

    start() {
        super.start()
        game.addPersistRootNode(this.node);
    }

    render() {
        const audioSource = this.getComponent(AudioSource)
        if (DataManager.Instance.curScene === SceneEnum.H2A) {
            if (this.curClip !== this.gameClip) {
                audioSource.stop()
                audioSource.clip = this.curClip = this.gameClip
                audioSource.play()
            }
        } else if (this.curClip !== this.normalClip) {
            audioSource.stop()
            audioSource.clip = this.curClip = this.normalClip
            audioSource.play()
        }

    }
}
