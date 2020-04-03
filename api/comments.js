import { apiHelper } from '../plugins/axios'

export default {
  deleteComment({ commentId }) {
    return apiHelper.delete(`/comments/${commentId}`)
  }
}