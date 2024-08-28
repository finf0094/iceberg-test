export interface RequestParams {
    limit: number;
    skip: number;
    select?: string;
}

export interface BaseEntity {
    id: number;
}

export interface BaseAuditableEntity extends BaseEntity {
    created_at: Date;
    modified_at: Date;
}

export interface Pagination<T> {
    users: T[];   // Тут с бека должно приходить data а не users
    total: number;
    skip: number;
    limit: number;
}
