import React from "react";
import MainForm from "../components/form/MainForm";
import FormButton from "../components/form/FormButton";

function PageNotFound() {
  return (
    <MainForm>
      <h1 className="font-bold text-2xl text-center pb-4">Page Not Found</h1>
      <p className="text-center">
        We couldn't find the page that you're looking for.
      </p>
      <p className="text-center">Please check the address and try again.</p>
      <p className="text-center p-4">
        <span className="font-bold">Error code:</span> 404
      </p>
      <div className="flex justify-center">
        <FormButton to="/" className="mt-6">Back to Homepage</FormButton>
      </div>
    </MainForm>
  );
}

export default PageNotFound;
