// src/pages/PostDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../AuthContext';
import { ThumbsUp } from 'lucide-react';

const PostDetail = () => {
  const { postId } = useParams();
  const { userId, userRole } = useAuth();
  const isAdmin = userRole === "admin";

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/posts/${postId}`)
      .then(res => setPost(res.data))
      .catch(err => console.error('Error fetching post:', err));

    axiosInstance.get(`/comments/post/${postId}`)
      .then(res => setComments(res.data))
      .catch(err => console.error('Error fetching comments:', err));
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }

    try {
      await axiosInstance.post('/comments', {
        userId,
        postId,
        body: newComment,
        status: 'active',
      });
      const res = await axiosInstance.get(`/comments/post/${postId}`);
      setComments(res.data);
      setNewComment('');
      setError('');
      setExpanded(false);
    } catch (err) {
      console.error('Failed to submit comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      window.location.href = '/forums';
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  if (!post) return <div className="p-6">Loading post...</div>;

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-6 gap-6">
      <div className="flex-1 space-y-8">
        {/* POST SECTION */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200 relative">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
          {(Number(post.user.id) === Number(userId) || isAdmin) && (
            <button
              onClick={handleDeletePost}
              className="text-sm text-red-600 hover:underline absolute top-4 right-4"
            >
              🗑 Eliminar publicación
            </button>
          )}
          <p className="text-sm text-gray-500 mb-4">
            by {post.authorName} · in {post.forumName} · {new Date(post.createdAt).toLocaleString()}
          </p>
          <div className="prose prose-sm text-gray-800 mb-6">{post.body}</div>
          <div className="flex gap-4 border-t pt-4 text-sm text-gray-600">
            <button className="flex items-center gap-1 text-gray-500 hover:text-accent">
              <ThumbsUp size={16} />
              <span>Like</span>
            </button>
            <button className="hover:text-blue-600">🔗 Share</button>
          </div>
        </div>

        {/* COMMENT SECTION */}
        {!userId ? (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-6 rounded text-center">
            <div className="text-3xl mb-2">🔒</div>
            <p className="text-lg font-semibold">Inicia sesión para ver y participar en los comentarios</p>
            <p className="text-sm text-yellow-700 mt-1">
              Los comentarios están disponibles solo para usuarios registrados.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleCommentSubmit} className="mt-6 space-y-2">
              <textarea
                placeholder="Escribe tu comentario..."
                className="w-full border p-2 rounded resize-none focus:outline-accent focus:ring"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Comentar
              </button>
            </form>

            <div className="space-y-4 mt-6">
              {comments
                .filter(comment => comment.status === 'active')
                .map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 space-y-2 relative"
                  >
                    <p className="text-base text-gray-800 leading-relaxed">{comment.body}</p>
                    <p className="text-sm text-gray-500 italic">
                      — {comment.user?.email || 'Anónimo'}
                    </p>
                    {(Number(comment.user.id) === Number(userId) || isAdmin) && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="absolute top-2 right-2 text-xs text-red-500 hover:underline"
                      >
                        {console.log(comment.user.id, userId, comment.id)}
                        Eliminar
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </>
        )}
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="w-full lg:w-1/3 hidden lg:block">
        <div className="bg-white border rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-2">Forum Info</h3>
          <p className="text-gray-600 text-sm">Coming soon: stats, rules, moderators...</p>
        </div>
      </aside>
    </div>
  );
};

export default PostDetail;
