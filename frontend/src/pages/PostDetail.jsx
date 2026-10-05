import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api";

function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const loadPost = () => {
    API.get(`/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error loading post:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    try {
      const response = await API.post(
        `/posts/${id}/comments`,
        {
          text: comment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPost(response.data);
      setComment("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add comment"
      );
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="detail-not-found">
        <h2>Post not found</h2>

        <Link to="/">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="detail-page">
      <article className="detail-card">
        <div className="detail-banner">
          📝
        </div>

        <div className="detail-content">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>

          <div className="detail-tags">
            {post.tags?.map((tag) => (
              <span key={tag}>
                #{tag}
              </span>
            ))}
          </div>

          <h1>{post.title}</h1>

          <div className="author-info">
            <div className="author-avatar">
              {post.author?.name?.charAt(0) || "U"}
            </div>

            <div>
              <strong>
                {post.author?.name || "Unknown"}
              </strong>

              <p>
                BlogSphere Author
              </p>
            </div>
          </div>

          <div className="detail-text">
            {post.content}
          </div>
        </div>
      </article>

      <section className="comments-section">
        <div className="comments-header">
          <h2>Comments</h2>

          <span>
            {post.comments?.length || 0}
          </span>
        </div>

        {post.comments?.length === 0 ? (
          <div className="no-comments">
            <div>💬</div>

            <p>
              No comments yet. Be the first to
              share your thoughts!
            </p>
          </div>
        ) : (
          <div className="comments-list">
            {post.comments.map((item, index) => (
              <div
                className="comment-card"
                key={index}
              >
                <div className="comment-avatar">
                  {item.user?.charAt(0) || "U"}
                </div>

                <div>
                  <strong>{item.user}</strong>

                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {token ? (
          <form
            className="comment-form"
            onSubmit={handleComment}
          >
            <textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              required
            />

            <button type="submit">
              Add Comment →
            </button>
          </form>
        ) : (
          <div className="login-comment">
            <p>
              Login to join the conversation.
            </p>

            <Link to="/login">
              Login / Register
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default PostDetail;