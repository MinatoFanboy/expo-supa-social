import { supabase } from '@/lib/supabase';
import { uploadFile } from './imageServices';

export const createOrUpdatePost = async (post: any) => {
    try {
        /** Upload image */
        if (post.file && typeof post.file === 'object') {
            let isImage = post?.file?.type === 'image';
            let folderName = isImage ? 'postImages' : 'postVideos';

            let fileResult = await uploadFile(folderName, post?.file?.uri, isImage);
            if (fileResult.success) {
                post.file = fileResult.data;
            } else {
                return fileResult;
            }
        }

        const { data, error } = await supabase.from('posts').upsert(post).select().single();

        if (error) {
            console.log('Create post error >>:', error);
            return { msg: 'Could not create your post', success: false };
        }

        return { data, success: true };
    } catch (error) {
        console.log('Create post error >>:', error);
        return { msg: 'Could not create your post', success: false };
    }
};

export const fetchPosts = async (limit = 10) => {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select(`*, user: users (id, name, image), postLikes (*)`)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.log('Fetch posts error >>:', error);
            return { msg: 'Could not fetch the posts', success: false };
        }

        return { data, success: true };
    } catch (error) {
        console.log('Fetch posts error >>:', error);
        return { msg: 'Could not fetch the posts', success: false };
    }
};

export const createPostLike = async (postLike: any) => {
    try {
        const { data, error } = await supabase.from('postLikes').insert(postLike).select().single();

        if (error) {
            console.log('Post like error >>:', error);
            return { msg: 'Could not fetch the posts', success: false };
        }

        return { data, success: true };
    } catch (error) {
        console.log('Post like error >>:', error);
        return { msg: 'Could not fetch the posts', success: false };
    }
};

export const removePostLike = async (postId: string, userId?: string) => {
    try {
        const { error } = await supabase.from('postLikes').delete().eq('userId', userId).eq('postId', postId);

        if (error) {
            console.log('Post like error >>:', error);
            return { msg: 'Could not remove the post like', success: false };
        }

        return { success: true };
    } catch (error) {
        console.log('Post like error >>:', error);
        return { msg: 'Could not remove the post like', success: false };
    }
};
