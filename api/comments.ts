import { $axios } from '@/assets/utils/externalModule';
import type { DeleteComment, CreateComment } from '@/types/ajaxPayload';

export default {
  deleteComment({ commentId }: DeleteComment) {
    return $axios.delete(`/comments/${commentId}`);
  },
  createComment({ restaurantId, text }: CreateComment) {
    return $axios.post(`/comments`, { restaurantId, text });
  },
}