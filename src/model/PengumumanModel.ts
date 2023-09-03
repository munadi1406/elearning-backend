import { Pengumuman } from "./schema/Pengumuman"
import { Post } from "./schema/Post"

export const detailPengumuman = async (id_post:number)=>{
    try {
        const data = await Post.findOne({
            where: {
                id_post
            },
            include: {
                model: Pengumuman,
                as: "pengumuman",
            }
        })
        return data
    } catch (error) {
        throw error
    }
}