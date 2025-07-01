export interface CommentUser {
    userId: number;
    userName: string;
    userImageUrl: string;
}

export interface Comment {
    commentId: number;
    parentId: number | null;
    user: CommentUser;
    content: string;
    totalLikes: number;
    totalReplys: number;
    createdAt: string;
    isDelete: boolean;
    replies: Comment[];
}

export interface BestComment {
    commentId: number;
    user: CommentUser;
    content: string;
    totalLikes: number;
}
