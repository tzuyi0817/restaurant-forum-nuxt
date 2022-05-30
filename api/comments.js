import { $axios } from "@/api";

export default {
  deleteComment({ commentId }) {
    return $axios.delete(`/comments/${commentId}`);
  },
  createComment({ restaurantId, text }) {
    return $axios.post(`/comments`, { restaurantId, text });
  },
}