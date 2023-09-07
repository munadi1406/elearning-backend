import { Pengumuman } from "./schema/Pengumuman"
import { Post } from "./schema/Post"
import { Users } from "./schema/Users"

export const detailPengumuman = async (id_post: number) => {
    try {
        const data = await Post.findOne({
            where: {
                id_post
            },
            include: [{
                model: Pengumuman,
                as: "pengumuman",
            },
            {
                attributes: ['username'],
                model: Users,
                as: 'users',
            }
            ],
        })
        return data
    } catch (error) {
        throw error
    }
}