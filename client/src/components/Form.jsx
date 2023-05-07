import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

const Form = ({ data, schema, onSubmit, onError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState: { isSubmitSuccessful },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const renderField = (fields) => {
    return fields.map((field) => {
      let ref = field.ref ? field.ref : field.name;

      switch (field.type) {
        case "text":
          if (field.title !== "") {
            return (
              <>
                <label key={field.title} htmlFor={field.name}>
                  {field.title}
                </label>
                <input
                  key={field.name}
                  type="text"
                  name={field.name}
                  id={field.name}
                  {...register(ref)}
                />
              </>
            );
          } else {
            return (
              <input
                key={field.name}
                type="text"
                name={field.name}
                id={field.name}
                {...register(ref)}
              />
            );
          }

        case "number":
          return (
            <>
              <label key={field.title} htmlFor={field.name}>
                {field.title}
              </label>
              <input
                key={field.name}
                type="number"
                name={field.name}
                id={field.name}
                {...register(ref)}
              />
            </>
          );

        case "select":
          return (
            <>
              <label key={field.title} htmlFor={field.name}>
                {field.title}
              </label>
              <select
                key={field.name}
                name={field.name}
                id={field.name}
                {...register(ref)}
              >
                <option key="optionDefault" value="">
                  Select an option
                </option>
                {field.options.map((option, index) => {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </>
          );

        case "email":
          return (
            <>
              <label key={field.title} htmlFor={field.name}>
                {field.title}
              </label>
              <input
                type="email"
                name={field.name}
                id={field.name}
                {...register(ref)}
              />
            </>
          );
        default:
          return (
            <div>
              <span key="invalid">Invalid Field</span>
            </div>
          );
      }
    });
  };

  const renderFieldset = (fieldsets) => {
    return fieldsets.map((fieldSet) => {
      return (
        <fieldset
          key={fieldSet.title}
          className="grid items-center justify-start w-full grid-cols-2 gap-2 p-2 m-2 text-sm border-4 border-gray-200 rounded-md md:grid-cols-4 ring-slate-800"
        >
          <legend className="p-2 font-thin text-left">{fieldSet.title}</legend>
          {renderField(fieldSet.fields)}
        </fieldset>
      );
    });
  };

  const renderError = (errors) => {
    const keys = Object.keys(errors);
    if (keys.length > 0) {
      if (errors[keys[0]]?.message)
        return (
          <div className="w-11/12 mx-auto my-2 text-center text-red-900 rounded-sm shadow-sm md:w-1/4 ring ring-red-600">
            {errors[keys[0]]?.message.toString().toUpperCase()}
          </div>
        );
    }
  };

  return (
    <div>
      {renderError(errors)}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <span className="w-full text-2xl text-gray-800 uppercase ">
          {data.title}
        </span>

        {renderFieldset(data.fieldsets)}

        <button id="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
