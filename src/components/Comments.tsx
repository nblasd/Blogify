import React from "react";

function Comments() {
  return (
    <div className="w-full flex flex-col items-start justify-center">
      <h3 className="text-lg font-bold mb-5">Comments</h3>
      <div className="flex flex-col items-start justify-center py-2 gap-2  bg-blue-200 w-full rounded-lg">
        <div className="flex items-center justify-start px-5 gap-5 w-full">
          <p className="font-semibold">John doe</p>
          <span className="text-sm">10 November,2023</span>
        </div>
        <span className="px-5">Wow awesome broo!!</span>
      </div>
    </div>
  );
}

export default Comments;
