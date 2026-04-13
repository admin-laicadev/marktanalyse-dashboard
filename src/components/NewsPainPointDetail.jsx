import { useParams, Link } from 'react-router-dom';
import { newsArticles, newsPainPoints } from '../data/news';

export function NewsPainPointDetail() {
  const { id } = useParams();
  const item = newsPainPoints.find((p) => p.id === Number(id));

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Pain point not found.</p>
        <Link to="/news" className="text-teal-600 hover:underline mt-2 inline-block">← Back to News</Link>
      </div>
    );
  }

  const relatedArticles = newsArticles.filter((a) =>
    item.relatedArticleIds.includes(a.id)
  );

  return (
    <div className="space-y-6">
      <Link to="/news" className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium">
        ← Back to News
      </Link>

      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-bold flex-shrink-0">
          {item.relatedArticleIds.length} articles
        </span>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700">{item.description}</p>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-3">Related Articles</h3>
        <div className="space-y-3">
          {relatedArticles.map((article) => (
            <div key={article.id} className="border-l-4 border-orange-300 pl-3">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-600 hover:underline"
              >
                {article.title} →
              </a>
              <p className="text-sm text-gray-600 mt-1">
                {article.source} • {article.date}
              </p>
              <p className="text-sm text-gray-700 italic mt-1">
                "{article.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
