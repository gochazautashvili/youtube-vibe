import { sidebarLinks, sidebarLinksYou } from "@/lib/helpers";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { ArrowRight } from "lucide-react";
import getUser from "@/data/getUser";

const Sidebar = async () => {
  const user = await getUser();

  return (
    <aside className="space-y-4 px-3 py-2">
      <ul>
        {sidebarLinks.map((link) => (
          <li
            className="rounded-md px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-500"
            key={link.link}
          >
            <Link className="flex items-center gap-3" href={link.link}>
              {link.icon} {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <Separator />
      <ul>
        <li>
          <Link
            className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-semibold hover:bg-gray-100 dark:hover:bg-gray-500"
            href={`/channel/${user?.id}`}
          >
            You <ArrowRight />
          </Link>
        </li>
        {sidebarLinksYou(user?.id).map((link) => (
          <li key={link.link}>
            <Link
              className="flex items-center gap-3 rounded-md px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-500"
              href={link.link}
            >
              {link.icon} {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
