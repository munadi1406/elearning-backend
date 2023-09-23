import { col } from "sequelize";
import { webSocketInit } from ".."
import { Comments } from "./schema/Comments"
import { Users } from "./schema/Users"

interface payloadIt {
    id_users: number,
    id_post: number,
    comment: string,
}


export const createComments = async (payload: payloadIt) => {
    try {
        const data: any = await Comments.create({ ...payload });
        if (data) {
            const newComment = await Comments.findOne({
                attributes: ['id_comments', 'comment', 'createdAt', 'updatedAt',
                [col('user.username'), 'id_tugas'],
                [col('user.id_users'), 'id_users'],],
                include: {
                    model: Users,
                    attributes: [],
                    as: "user"
                },
                where: {
                    id_post: payload.id_post,
                    id_comments: data.id_comments
                },
                raw: true
            });
            webSocketInit.sendUpdateToClients(newComment);
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}


export const getCommentByPostId = async (id_post: number) => {
    try {
        const data = await Comments.findAll({
            attributes: ['id_comments', 'comment', 'createdAt', 'updatedAt',
                [col('user.username'), 'id_tugas'],
                [col('user.id_users'), 'id_users'],],
            include: {
                model: Users,
                attributes: [],
                as: "user"
            },
            where: {
                id_post
            },
            order: [['id_comments', 'asc']],
            raw: true
        })
        return data
    } catch (error) {
        throw error
    }
}




export const updateComments = async (id_comments: number, comment: string) => {
    try {
        const updateComment = await Comments.update({
            comment
        }, {
            where: {
                id_comments
            }
        })
        if (updateComment) {
            return true
        }
        return false
    } catch (error) {
        throw error;
    }
}
export const deleteComments = async (id_comments: number) => {
    try {
        const deleteComment = await Comments.destroy({
            where: {
                id_comments
            }
        })
        if (deleteComment) {
            return true
        }
        return false
    } catch (error) {
        throw error;
    }
}