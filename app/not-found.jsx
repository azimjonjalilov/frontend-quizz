import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-container container">
      <div>
        <h3>
          404 Error: Page not found. But don&apos;t worry, our developers are on a
          treasure hunt to recover it. Meanwhile, enjoy some virtual tea and
          biscuits!
        </h3>
        <Link href="/" className="btn">
          Go To Home
        </Link>
      </div>
    </div>
  );
}
