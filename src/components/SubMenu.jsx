import { Link, useLocation } from "wouter";
import { classNames } from "../utils/tailwindUtils.js";

const SubMenu = ({ routes }) => {
  const [location] = useLocation();

  return (
    <div className="flex space-x-8">
      {routes.map((route, id) => (
        <Link
          key={id}
          href={route.path}
          className={classNames(
            'an',
            location === route.path ? 'an-active' : ''
          )}
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
};

export default SubMenu;
