import React from "react";

const NoResultFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 border rounded-md ">
      <h1 className="text-2xl font-bold mb-2">No Results Found</h1>
      <p className="text-muted-foreground text-center">
        We couldn't find any records to show.
      </p>
    </div>
  );
};

export default NoResultFound;
