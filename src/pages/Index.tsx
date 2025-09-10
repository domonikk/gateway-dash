import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Top Section - White Background */}
      <div className="bg-white">
        {/* Navigation */}
        <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-800">TicketFlow</h1>
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <a href="#" className="hover:text-gray-800 transition-colors">Home</a>
              <a href="#" className="hover:text-gray-800 transition-colors">Events</a>
              <a href="#" className="hover:text-gray-800 transition-colors">Features</a>
              <a href="#" className="hover:text-gray-800 transition-colors">Pricing</a>
            </div>
          </div>
          <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50">
            Try it for Free →
          </Button>
        </nav>

        {/* Hero Section */}
        <main className="px-6 py-16 pb-32 max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600 mb-4 italic">Your Events, in Perfect Rhythm.</p>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Events,<br />
              <span className="italic font-light">Not Hassle</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
              Take control of your event discovery with our all-in-one ticketing app. Find events, 
              book tickets, and focus on what matters—without the overwhelm.
            </p>
            <Button className="bg-gradient-bubblegum text-white px-8 py-3 text-lg font-semibold rounded-full hover:opacity-90 transition-opacity">
              Try it for Free →
            </Button>
          </div>
        </main>
      </div>

      {/* Features Section - Gradient Background */}
      <section className="bg-gradient-bubblegum px-6 py-20">
         <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Designed to<br />
                Help You Do<br />
                <span className="italic font-light">More With Less</span><br />
                <span className="italic font-light">Stress</span>
              </h2>
            </div>
            <div className="space-y-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our event discovery app is built for modern event-goers who 
                want to stay organized, focused, and in control.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">Smart Event Discovery</h3>
                  <p className="text-gray-600">
                    Easily create, categorize and prioritize events with a 
                    drag-and-drop interface that adapts to your workflow.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">Integrated Calendar & Reminders</h3>
                  <p className="text-gray-600">
                    Stay organized with a built-in calendar 
                    that syncs across all your devices and reminds you 
                    before deadlines hit.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">Focus Mode</h3>
                  <p className="text-gray-600">
                    Eliminate distractions with a minimalist interface and 
                    time-blocking tools that help you get deep work 
                    done without interruption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
