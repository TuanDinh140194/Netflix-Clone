import useNotification from "@/hooks/useNotification";
import React from "react";

interface AccountMenuProps {
  visible?: boolean;
}

const Notification: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: notification = [] } = useNotification();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black bg-opacity-40 w-86 absolute top-16 right-14 mr-14 flex-col border-2 border-gray-800 flex z-20 ">
      {notification.map((notify: any, index:any) => (
        <>
          <div
            className={` ${
              index < notification.length - 1
                ? "border-b-2 border-gray-800"
                : ""
            } hover:bg-black hover:bg-opacity-100`}
            key={notify.id}
          >
            <div className="flex flex-col gap-3">
              <div className="px-3 group/item flex flex-row gap-3 items-center w-full py-4 ">
                <img
                  className="w-20 h-20 rounded-md"
                  src={notify.image}
                  alt={notify.id}
                />
                <p
                  key={notify.id}
                  className="text-white text-sm group-hover/item:underline "
                >
                  {notify.info}
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Notification;
