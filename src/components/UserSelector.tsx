import cn from 'classnames';
import { useState } from 'react';
import type { User } from '../types/User';

type Props = {
  users: User[] | null;
  selected: number | null;
  selectUser: (user: number) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selected,
  selectUser,
}) => {
  const [userList, setUserList] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': userList,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setUserList(prev => !prev)}
        >
          <span>
            {users?.find(user => user.id === selected)?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users?.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selected === user.id,
              })}
              onClick={() => {
                selectUser(user.id);
                setUserList(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
