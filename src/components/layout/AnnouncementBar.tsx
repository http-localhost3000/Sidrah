import { announcement } from "@/data/site";

// Slim editorial announcement strip. Sits directly above the Navbar.
export function AnnouncementBar() {
  return (
    <div className="w-full bg-ink text-page">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-center px-5 sm:px-6 lg:px-10 xl:px-14">
        <p className="eyebrow text-page/80">{announcement.message}</p>
      </div>
    </div>
  );
}
