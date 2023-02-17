import Singleton from '../Base/Singleton'
import { EventEnum, ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum } from '../Enum'
import EventManager from './EventManager'

interface IItem {
    status: ItemStatusEnum
    type: ItemTypeEnum
}

export default class DataManager extends Singleton {
    static get Instance() {
        return super.GetInstance<DataManager>()
    }

    /* 当前选择物品 */
    private _curItemType: ItemTypeEnum | null = null
    /* 场景里所有物品的状态 */
    private _items: Array<IItem> = [
        { type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene },
        { type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable },
    ]
    private _isSelected = false
    private _mailboxStatus: TriggerStatusEnum = TriggerStatusEnum.Pending
    private _grandmaStatus: TriggerStatusEnum = TriggerStatusEnum.Pending
    private _grandmaDialogIndex: number = -1

    get curItemType() {
        return this._curItemType
    }

    set curItemType(newData) {
        this._curItemType = newData
        this.render()
    }

    get items() {
        return this._items
    }

    set items(newData: Array<IItem>) {
        this._items = newData
        //触发渲染
        this.render()
    }

    get isSelected() {
        return this._isSelected
    }

    set isSelected(newData) {
        this._isSelected = newData
        this.render()
    }

    get mailboxStatus() {
        return this._mailboxStatus
    }

    set mailboxStatus(newData) {
        this._mailboxStatus = newData
        this.render()
    }

    get grandmaStatus() {
        return this._grandmaStatus
    }

    set grandmaStatus(newData) {
        this._grandmaStatus = newData
        this.render()
    }

    get grandmaDialogIndex() {
        return this._grandmaDialogIndex
    }

    set grandmaDialogIndex(newData) {
        this._grandmaDialogIndex = newData
        this.render()
    }

    render() {
        EventManager.Instance.emit(EventEnum.Render)
    }
}
