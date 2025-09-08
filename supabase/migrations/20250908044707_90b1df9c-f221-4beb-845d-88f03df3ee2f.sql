-- Add missing policies for events and ticket_types tables

-- Events policies (add insert, update, delete for admins)
CREATE POLICY "Admins can insert events" ON public.events FOR INSERT WITH CHECK (false); -- Only admins should insert
CREATE POLICY "Admins can update events" ON public.events FOR UPDATE USING (false); -- Only admins should update  
CREATE POLICY "Admins can delete events" ON public.events FOR DELETE USING (false); -- Only admins should delete

-- Ticket types policies (add insert, update, delete for admins)
CREATE POLICY "Admins can insert ticket types" ON public.ticket_types FOR INSERT WITH CHECK (false);
CREATE POLICY "Admins can update ticket types" ON public.ticket_types FOR UPDATE USING (false);
CREATE POLICY "Admins can delete ticket types" ON public.ticket_types FOR DELETE USING (false);