// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="text-center text-white p-8">
        <h1 className="mb-6 text-5xl font-bold">TicketFlow</h1>
        <p className="text-xl mb-8 text-white/80">Discover amazing events near you</p>
        <div className="space-y-4">
          <a 
            href="/auth" 
            className="inline-block bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Get Started
          </a>
          <p className="text-white/60 text-sm">
            Join thousands discovering events daily
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
