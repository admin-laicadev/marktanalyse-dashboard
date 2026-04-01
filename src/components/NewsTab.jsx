import { useState } from 'react';
import { Modal } from './Modal';
import { newsArticles, newsPainPoints } from '../data/news';

const categories = [
  'Alle',
  'souveraenitaet',
  'gaiax',
  'foerderung',
  'dsgvo',
  'opensource',
  'kiverordnung',
  'cloud',
  'nis2',
  'verwaltung',
];

const categoryLabels = {
  'Alle': 'Alle Kategorien',
  'souveraenitaet': 'Digitale Souveränität',
  'gaiax': 'Gaia-X & Sovereign Cloud',
  'foerderung': 'KMU-Digitalisierung & Förderung',
  'dsgvo': 'DSGVO-konforme Alternativen',
  'opensource': 'Open Source Strategie',
  'kiverordnung': 'KI-Verordnung EU',
  'cloud': 'Cloud & Souveräne Cloud',
  'nis2': 'NIS2 & Cybersicherheit',
  'verwaltung': 'Verwaltungsdigitalisierung',
};

const sentimentColors = {
  'positiv': 'bg-green-100 text-green-800',
  'neutral': 'bg-gray-100 text-gray-800',
  'kritisch': 'bg-yellow-100 text-yellow-800',
  'warnung': 'bg-red-100 text-red-800',
};

export function NewsTab() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedSentiment, setSelectedSentiment] = useState(null);
  const [selectedPainPoint, setSelectedPainPoint] = useState(null);

  const filtered = newsArticles.filter((article) => {
    const categoryMatch =
      selectedCategory === 'Alle' || article.category === selectedCategory;
    const sentimentMatch =
      !selectedSentiment || article.sentiment === selectedSentiment;
    return categoryMatch && sentimentMatch;
  });

  const relatedArticles = selectedPainPoint
    ? newsArticles.filter((a) =>
        selectedPainPoint.relatedArticleIds.includes(a.id)
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-bold text-green-900 mb-2">52 Market News Articles</h3>
        <p className="text-green-800 text-sm">
          Real-time market trends covering digital sovereignty, KI adoption, DSGVO compliance, funding opportunities,
          and strategic partnerships. These articles validate market demand for Laica.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-2">Filter by Sentiment</h3>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedSentiment(null)}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                !selectedSentiment
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Sentiments
            </button>
            {['positiv', 'neutral', 'kritisch', 'warnung'].map((sent) => (
              <button
                key={sent}
                onClick={() => setSelectedSentiment(sent)}
                className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                  selectedSentiment === sent
                    ? sentimentColors[sent] + ' ring-2'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {sent.charAt(0).toUpperCase() + sent.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((article) => (
          <div
            key={article.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start gap-2 mb-2">
              <div className="flex-1">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-gray-900 hover:text-teal-600 transition-colors"
                >
                  {article.title} →
                </a>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${sentimentColors[article.sentiment]}`}
              >
                {article.sentiment}
              </span>
            </div>

            <div className="text-xs text-gray-600 mb-2">
              {article.source} • {article.date}
            </div>

            <p className="text-sm text-gray-700 italic">"{article.quote}"</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Articles Grouped by Pain Point</h3>
        <div className="space-y-3">
          {newsPainPoints.map((pp) => (
            <button
              key={pp.id}
              onClick={() => setSelectedPainPoint(pp)}
              className="w-full text-left bg-white border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900">{pp.title}</h4>
                  <p className="text-sm text-gray-600">{pp.description}</p>
                </div>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold flex-shrink-0">
                  {pp.relatedArticleIds.length} articles
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!selectedPainPoint}
        onClose={() => setSelectedPainPoint(null)}
        title={selectedPainPoint?.title || ''}
      >
        {selectedPainPoint && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{selectedPainPoint.description}</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Related Articles</h3>
              <div className="space-y-3">
                {relatedArticles.map((article) => (
                  <div
                    key={article.id}
                    className="border-l-4 border-orange-300 pl-3"
                  >
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
        )}
      </Modal>
    </div>
  );
}