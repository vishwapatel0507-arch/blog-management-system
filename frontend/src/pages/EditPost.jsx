import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: ""
  });

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((response) => {
        const post = response.data;

        setForm({
          title: post.title,
          content: post.content,
          tags: post.tags?.join(", ") || ""
        });
      })
      .catch((error) => {
        console.error("Error loading post:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/posts/${id}`,
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

      alert("Post updated successfully");

      navigate(`/post/${id}`);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update post"
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

  return (
    <main className="form-page">
      <div className="form-card">
        <div className="form-header">
          <div className="form-icon">✏️</div>

          <div>
            <p className="section-label">
              EDIT
            </p>

            <h1>Edit Your Post</h1>

            <p>
              Update your post and keep your ideas
              fresh.
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
              placeholder="Enter post title..."
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Content</label>

            <textarea
              name="content"
              placeholder="Write your post..."
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
              onClick={() => navigate(`/post/${id}`)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-post-btn"
            >
              Save Changes →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditPost;