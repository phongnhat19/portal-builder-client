declare type NotificationGRN = {
    url?: string,
    title?: string,
    body?: string,
    isRead?: boolean,
    createdAt: string,
    creator?: {
        name: string,
        code: string
    }
} 