import clsx from "clsx";

import { Footer } from "./Footer";
import Header from "./Header";
import { Outlet, useLocation, useParams } from "react-router";
import { useSearchParams } from "../hooks";

const Shell = ({ padContent = true }: { padContent?: boolean }) => {
  const loc = useLocation();

  console.log("Shell", loc);

  return (
    <>
      <Header />
      <div
        className={clsx({
          "mx-auto mb-4 mt-8 max-w-4xl px-2": padContent,
        })}
      >
        <Outlet />
      </div>
      <Footer className="m-auto max-w-4xl my-16" />
    </>
  );
};

export default Shell;
