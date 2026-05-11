-- Drop the old blanket policies that broke user isolation
drop policy if exists "Public can view shared brands" on public.brands;
drop policy if exists "Public can view shared signal results" on public.signal_results;
drop policy if exists "Public can view shared craft results" on public.craft_results;

-- New scoped policies: only expose brands the owner has explicitly marked public
create policy "Public can view explicitly shared brands"
  on public.brands for select
  using (is_public = true);

create policy "Public can view signal results for shared brands"
  on public.signal_results for select
  using (
    exists (
      select 1 from public.brands
      where brands.id = signal_results.brand_id
        and brands.is_public = true
    )
  );

create policy "Public can view craft results for shared brands"
  on public.craft_results for select
  using (
    exists (
      select 1 from public.brands
      where brands.id = craft_results.brand_id
        and brands.is_public = true
    )
  );
