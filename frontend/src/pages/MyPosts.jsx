import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const loadPosts = async () => {
    try {
      const response = await API.get("/posts");

      const currentUser = JSON.parse(
        atob(token.split(".")[1])
      );

      const myPosts = response.data.filter(
        (post) => post.author?._id === currentUser.id
      );

      setPosts(myPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Post deleted successfully");

      loadPosts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete post"
      );
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading your posts...
      </div>
    );
  }

  return (
    <main className="my-posts-page">
      <section className="my-posts-header">
        <div>
          <p className="section-label">
            DASHBOARD
          </p>

          <h1>My Posts</h1>

          <p>
            Manage the posts you have shared with
            the BlogSphere community.
          </p>
        </div>

        <Link
          to="/create"
          className="new-post-btn"
        >
          ✍️ New Post
        </Link>
      </section>

      {posts.length === 0 ? (
        <div className="my-empty-state">
          <div className="empty-icon">📝</div>

          <h2>No posts yet</h2>

          <p>
            You haven't created any posts. Start
            sharing your ideas today!
          </p>

          <Link to="/create">
            Create Your First Post →
          </Link>
        </div>
      ) : (
        <div className="my-posts-grid">
          {posts.map((post) => (
            <article
              className="my-post-card"
              key={post._id}
            >
              <div className="my-post-top">
                <span className="my-post-icon">
                  📝
                </span>

                <span className="post-status">
                  Published
                </span>
              </div>

              <div className="my-post-content">
                <div className="tags">
                  {post.tags?.map((tag) => (
                    <span key={tag}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <h2>{post.title}</h2>

                <p>
                  {post.content?.length > 150
                    ? `${post.content.substring(
                        0,
                        150
                      )}...`
                    : post.content}
                </p>
              </div>

              <div className="my-post-actions">
                <Link
                  to={`/post/${post._id}`}
                  className="view-btn"
                >
                  View
                </Link>

                <Link
                  to={`/edit/${post._id}`}
                  className="edit-btn"
                >
                  Edit
                </Link>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(post._id)
                  }
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyPosts;