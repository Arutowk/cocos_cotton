/** 场景地图*/
export enum SceneEnum {
    H1 = 'H1',
    H2 = 'H2',
    H3 = 'H3',
    H4 = 'H4',
    H2A = 'H2A',
}

/** 物品状态*/
export enum ItemStatusEnum {
    /** 在场景中*/
    Scene = 'Scene',
    /** 在背包中*/
    Inventory = 'Inventory',
    /** 已经使用*/
    Disable = 'Disable',
}

/** 物品类型*/
export enum ItemTypeEnum {
    Key = 'Key',
    Mail = 'Mail',
}

export enum EventEnum {
    Render = 'Render',
}

export enum TriggerTypeEnum {
    MailBox = 'MailBox',
    Grandma = 'Grandma',
    Door = 'Door',
}

export enum TriggerStatusEnum {
    Pending = 'Pending',
    Resolved = 'Resolved',
}
