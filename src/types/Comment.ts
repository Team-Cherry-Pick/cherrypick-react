export interface CommentUser {
    userId: number;
    userName: string;
    userImageUrl: string;
}

export interface Reply {
    commentId: number;
    parentId: number;
    user: CommentUser;
    content: string;
    totalLikes: number;
    createdAt: string;
    isDelete: boolean;
}

export interface Comment {
    commentId: number;
    parentId: null; // 항상 null
    user: CommentUser;
    content: string;
    totalLikes: number;
    totalReplys: number;
    createdAt: string;
    isDelete: boolean;
    replies: Reply[];
}

export interface BestComment {
    commentId: number;
    user: CommentUser;
    content: string;
    totalLikes: number;
    createdAt: string;
}
