import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { popNotification } from "../../features/ui/uiSlice";

const Notifications = () => {
  const list = useSelector((s: RootState) => s.ui.notifications);
  const dispatch = useDispatch();

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {list.map((n) => (
        <div key={n.id} className="p-3 rounded shadow">
          <div className="flex items-start">
            <div className="flex-1">
              <strong>{n.type.toUpperCase()}</strong>
              <div>{n.message}</div>
            </div>
            <button onClick={() => dispatch(popNotification(n.id))} className="ml-2">✕</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
