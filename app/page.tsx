import ShortenerForm from '@/components/ShortenerForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-xl">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-light tracking-tight text-black dark:text-white mb-3">
              Linkly
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-light tracking-wide">
              Simple URL shortening
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-8">
            <ShortenerForm />
          </div>
        </div>
      </main>
    </div>
  );
}
