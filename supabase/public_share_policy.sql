-- Allow anyone to read brands for share page
create policy "Public can view shared brands"
  on public.brands for select
  using (true);

create policy "Public can view shared signal results"
  on public.signal_results for select
  using (true);

create policy "Public can view shared craft results"
  on public.craft_results for select
  using (true);
