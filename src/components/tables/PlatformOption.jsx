import * as styles from './TicketsTable.tailwind';
import {useUserContext} from "../../context/UserContext.jsx";

const PlatformOption = ({
  id,
  setPlatformValue,
  platformValue,
}) => {
  const { platforms_linked } = useUserContext().user;

  const linkedPlatforms = Object
    .keys(platforms_linked)
    .filter(platform => platforms_linked[platform]);

  const platforms = [
    { id: 'jira', value: "JIRA", label: "Jira" },
    { id: 'shortcut', value: "SHORTCUT", label: "Shortcut" },
    { id: 'asana', value: "ASANA", label: "Asana"}
  ];

  const platformOptions = platforms.filter(platform => linkedPlatforms.includes(platform.id));

  return (
      <td className={styles.tableDataSelect_tw}>
        {platformOptions.length === 0
          ? (
            <div>
              No linked platforms
            </div>
          )
          : (
            <select
              id={id}
              className={styles.tableRowSelect_tw}
              onChange={(e) => setPlatformValue(e.target.value)}
              value={platformValue}
            >
              {platformOptions.map(platform => (
                <option
                  className="text-black"
                  key={platform.id}
                  value={platform.value}
                >
                  {platform.label}
                </option>
              ))}
          </select>
        )}
      </td>
  );
};

export default PlatformOption;
