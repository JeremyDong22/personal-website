// Blog posts index — imports individual post JSON files (newest first)
// v4: migrated to per-post JSON files in src/data/blog/ for dev editor support
import post5 from './blog/hand-them-the-paintbrush.json';
import post4 from './blog/symptom-driven-development.json';
import post3 from './blog/mianyang-cursor-summer.json';
import post2 from './blog/inventory-from-two-hours-to-ten-minutes.json';
import post1 from './blog/pos-printer-interception.json';

const blogPosts = [post5, post4, post3, post2, post1];

export default blogPosts;
