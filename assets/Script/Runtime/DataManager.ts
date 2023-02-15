import Singleton from '../Base/Singleton'
import { EventEnum, ItemStatusEnum, ItemTypeEnum } from '../Enum'
import EventManager from './EventManager'

interface IItem {
    status: ItemStatusEnum
    type: ItemTypeEnum
}

export default class DataManager extends Singleton {
    static get Instance() {
        return super.GetInstance<DataManager>()
    }

    private _items: Array<IItem> = [
        {
            type: ItemTypeEnum.Key,
            status: ItemStatusEnum.Scene,
        },
        {
            type: ItemTypeEnum.Mail,
            status: ItemStatusEnum.Scene,
        },
    ]

    get items() {
        return this._items
    }

    set items(newData: Array<IItem>) {
        this._items = newData

        //触发渲染
        EventManager.Instance.emit(EventEnum.Render)
    }
}
