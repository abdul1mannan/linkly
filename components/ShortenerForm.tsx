'use client';

import { useState } from 'react';

export default function ShortenerForm() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setLoading(true);

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create short link');
      }

      setShortUrl(data.shortUrl);
      setLongUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="longUrl" className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 tracking-wide uppercase">
            Enter URL
          </label>
          <input
            type="url"
            id="longUrl"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            required
            className="w-full px-4 py-3.5 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-1 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-all text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 dark:bg-white dark:hover:bg-gray-200 dark:disabled:bg-gray-600 text-white dark:text-black font-medium py-3.5 px-6 rounded-xl transition-all text-sm tracking-wide"
        >
          {loading ? 'Creating...' : 'Shorten'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl">
          <p className="text-gray-700 dark:text-gray-300 text-sm">{error}</p>
        </div>
      )}

      {shortUrl && (
        <div className="p-5 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl space-y-3">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Your short link
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 px-4 py-2.5 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-black dark:text-white"
            />
            <button
              onClick={handleCopy}
              className="px-6 py-2.5 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-medium rounded-lg transition-all text-sm"
            >
              {copied ? '✓' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
