import { $axios } from '@/assets/utils/externalModule';

export default {
  deleteComment({ commentId }) {
    return $axios.delete(`/comments/${commentId}`);
  },
  createComment({ restaurantId, text }) {
    return $axios.post(`/comments`, { restaurantId, text });
  },
}