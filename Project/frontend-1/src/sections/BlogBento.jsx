import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { BLOG_META as BLOGS } from '../data/blogs/meta.js';

export default function BlogBento({ title = 'Trending on the blog' }) {
  const posts = BLOGS.filter((b) => b.trending).slice(0, 5);
  return (
    <section className="section bento-sec" aria-labelledby="bento-title">
      <div className="container">
        <div className="bento-head reveal">
          <div>
            <p className="eyebrow"><Icon name="trend" size={14} /> Blogs</p>
            <h2 id="bento-title">{title}</h2>
          </div>
          <Link to="/blog" className="btn btn-dark">All blogs <Icon name="arrow" size={18} /></Link>
        </div>
        <ul className="bento">
          {posts.map((p, i) => (
            <li key={p.slug} className={`bento-card b${i}`}>
              <Link to={`/blog/${p.slug}`}>
                <img src={p.cover} alt={`Illustration for ${p.title}`} width="1200" height="675" loading="lazy" />
                <div className="bento-over">
                  <span className="bento-cat">{p.category}</span>
                  <h3>{p.title}</h3>
                  {i === 0 ? <p>{p.excerpt}</p> : null}
                  <span className="bento-read">{p.readMins} min read <Icon name="arrow" size={14} /></span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
