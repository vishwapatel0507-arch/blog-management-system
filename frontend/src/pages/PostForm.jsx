import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function PostForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/posts",
        {
          title: form.title,
          content: form.content,
          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Post created successfully");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create post"
      );
    }
  };

  return (
    <main className="form-page">
      <div className="form-card">
        <div className="form-header">
          <div className="form-icon">✍️</div>

          <div>
            <p className="section-label">
              CREATE
            </p>

            <h1>Write a New Post</h1>

            <p>
              Share your ideas and stories with the
              BlogSphere community.
            </p>
          </div>
        </div>

        <form
          className="post-form"
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <label>Post Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter an interesting title..."
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Content</label>

            <textarea
              name="content"
              placeholder="Write your post here..."
              value={form.content}
              onChange={handleChange}
              rows="10"
              required
            />
          </div>

          <div className="input-group">
            <label>Tags</label>

            <input
              type="text"
              name="tags"
              placeholder="college, technology, life"
              value={form.tags}
              onChange={handleChange}
            />

            <small>
              Separate multiple tags using commas.
            </small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-post-btn"
            >
              Publish Post →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default PostForm;