import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">
        Loading posts...
      </div>
    );
  }

  return (
    <main className="home">
      <section className="hero">
        <div>
          <p className="hero-small">
            WELCOME TO BLOGSPHERE
          </p>

          <h1>
            Share your ideas.
            <br />
            Inspire the world.
          </h1>

          <p className="hero-text">
            Discover interesting stories, share your
            thoughts and connect with other writers.
          </p>

          <Link to="/create" className="hero-btn">
            ✍️ Write a Post
          </Link>
        </div>
      </section>

      <section className="posts-section">
        <div className="section-heading">
          <div>
            <p className="section-label">
              EXPLORE
            </p>
            <h2>Latest Blog Posts</h2>
          </div>

          <span>
            {posts.length}{" "}
            {posts.length === 1 ? "Post" : "Posts"}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <h3>No posts yet</h3>
            <p>
              Be the first person to share something!
            </p>

            <Link to="/create">
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <article
                className="post-card"
                key={post._id}
              >
                <div className="post-icon">
                  📝
                </div>

                <div className="post-card-content">
                  <div className="tags">
                    {post.tags?.map((tag) => (
                      <span key={tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3>{post.title}</h3>

                  <p className="post-preview">
                    {post.content?.length > 140
                      ? `${post.content.substring(
                          0,
                          140
                        )}...`
                      : post.content}
                  </p>

                  <div className="post-footer">
                    <span>
                      By{" "}
                      <strong>
                        {post.author?.name ||
                          "Unknown"}
                      </strong>
                    </span>

                    <Link
                      to={`/post/${post._id}`}
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;