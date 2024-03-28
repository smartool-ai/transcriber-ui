import { Link } from "wouter";

const SubMenu = ({ routes }) => (
  <div className="flex space-x-8">
    {routes.map((route, id) => (
      <Link key={id} href={route.path} className="an">
        {route.label}
      </Link>
    ))}
  </div>
);

export default SubMenu;
