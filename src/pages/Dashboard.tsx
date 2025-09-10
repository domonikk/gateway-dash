import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search, Bookmark, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  description: string | null;
  image_url: string | null;
}

interface TicketType {
  id: string;
  name: string;
  price: number;
  available_quantity: number;
  event_id: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [ticketTypes, setTicketTypes] = useState<Record<string, TicketType[]>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (eventsError) throw eventsError;

      setEvents(eventsData || []);

      // Fetch ticket types for all events
      const { data: ticketData, error: ticketError } = await supabase
        .from("ticket_types")
        .select("*");

      if (ticketError) throw ticketError;

      // Group ticket types by event_id
      const groupedTickets = (ticketData || []).reduce((acc, ticket) => {
        if (!acc[ticket.event_id]) {
          acc[ticket.event_id] = [];
        }
        acc[ticket.event_id].push(ticket);
        return acc;
      }, {} as Record<string, TicketType[]>);

      setTicketTypes(groupedTickets);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const getLowestPrice = (eventId: string) => {
    const eventTickets = ticketTypes[eventId] || [];
    if (eventTickets.length === 0) return null;
    const lowestPrice = Math.min(...eventTickets.map(t => t.price));
    return formatPrice(lowestPrice);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10 bg-card border border-border">
              <AvatarFallback className="bg-muted text-foreground font-semibold">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-foreground text-lg font-medium">Username</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground hover:bg-accent"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-foreground hover:bg-accent"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search for events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-card backdrop-blur-sm border-border rounded-full text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>

      {/* Featured Event Carousel */}
      {filteredEvents.length > 0 && (
        <div className="px-4 mb-8">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: filteredEvents[0].image_url 
                  ? `url(${filteredEvents[0].image_url})` 
                  : 'url("/lovable-uploads/069cf1e4-9802-4bf0-9c5a-bf006c2456df.png")'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            
            <div className="absolute bottom-8 left-6 right-6">
              <h2 className="text-white text-3xl font-bold mb-2">
                {filteredEvents[0].title}
              </h2>
              <p className="text-white/90 text-lg mb-1">
                {filteredEvents[0].location}
              </p>
              <p className="text-white/80 text-sm">
                {new Date(filteredEvents[0].event_date).toLocaleDateString()}
              </p>
              
              {/* Carousel dots */}
              <div className="flex justify-center space-x-2 mt-6">
                {Array.from({ length: Math.min(7, filteredEvents.length) }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === 0 ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popular Events */}
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-foreground text-xl font-semibold">Popular Events</h3>
          <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Event Cards List */}
        <div className="space-y-4">
          {filteredEvents.slice(1).map((event) => (
            <Card key={event.id} className="bg-gray-900 border-gray-800 overflow-hidden relative">
              <div className="flex p-0">
                {/* Event Poster */}
                <div className="w-32 h-32 flex-shrink-0 relative">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: event.image_url 
                        ? `url(${event.image_url})` 
                        : 'url("/lovable-uploads/069cf1e4-9802-4bf0-9c5a-bf006c2456df.png")'
                    }}
                  />
                </div>
                
                {/* Heart Icon */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
                >
                  <Bookmark className="w-5 h-5" />
                </Button>
                
                {/* Event Details */}
                <div className="flex-1 min-w-0 p-6 text-white">
                  <h4 className="text-white font-bold text-xl leading-tight mb-3">
                    {event.title}
                  </h4>
                  <p className="text-gray-300 text-base mb-4">
                    {event.location}
                  </p>
                  
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Price:</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-white font-bold text-2xl">
                        {getLowestPrice(event.id) || "TBA"}
                      </span>
                      {getLowestPrice(event.id) && (
                        <span className="text-gray-400 text-sm">
                          (Super Early Bird)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No events found</p>
            <p className="text-muted-foreground/60 text-sm mt-2">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;