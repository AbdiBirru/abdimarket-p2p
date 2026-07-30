export default function Footer() {
  return (
    <footer className="hidden border-t border-slate-200 bg-white md:block">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
        <p className="font-semibold text-slate-700">AbdiMarket-P2P</p>
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
