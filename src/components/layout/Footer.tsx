export default function Footer() {
  return (
    <footer className="hidden bg-coffee-950 md:block">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-cream-50/70">
        <p className="font-display text-base font-semibold text-cream-50">
          AbdiMarket-P2P
        </p>
        <p className="mt-2 max-w-md">
          A place for buyers and sellers across Ethiopia to connect directly.
          AbdiMarket-P2P never handles payments or deliveries — those are
          arranged between buyer and seller.
        </p>
        <p className="mt-6">© {new Date().getFullYear()} AbdiMarket-P2P.</p>
      </div>
    </footer>
  );
}
