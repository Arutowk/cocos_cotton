import Singleton from '../Base/Singleton'

interface IItem {
    func: Function
    ctx: unknown
}

export default class EventManager extends Singleton {
    static get Instance() {
        return super.GetInstance<EventManager>()
    }

    private eventDic: Map<string, Array<IItem>> = new Map()

    on(eventName: string, func: Function, ctx?: unknown) {
        if (this.eventDic.has(eventName)) {
            this.eventDic.get(eventName).push({ func, ctx })
        } else {
            this.eventDic.set(eventName, [{ func, ctx }])
        }
    }

    off(eventName: string, func: Function, ctx?: unknown) {
        if (this.eventDic.has(eventName)) {
            const index = this.eventDic.get(eventName).findIndex(i => i.func === func && i?.ctx === ctx)
            index > -1 && this.eventDic.get(eventName).splice(index, 1)
        }
    }

    emit(eventName: string, ...params: unknown[]) {
        if (this.eventDic.has(eventName)) {
            this.eventDic.get(eventName).forEach(({ func, ctx }) => {
                ctx ? func.apply(ctx, params) : func(...params)
            })
        }
    }

    clear() {
        this.eventDic.clear()
    }
}
