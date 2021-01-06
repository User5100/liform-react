import React from "react";
import PropTypes from "prop-types";
import DefaultTheme from "./themes/bootstrap3";
import { Form } from "react-final-form";
import renderFields from "./renderFields";
import renderField from "./renderField";
import processSubmitErrors from "./processSubmitErrors";
import buildSyncValidation from "./buildSyncValidation";
import { setError } from "./buildSyncValidation";
import compileSchema from "./compileSchema";

const BaseForm = (props) => {
  return (
    <Form
      validate={
        props.syncValidation || buildSyncValidation(props.schema, props.ajv)
      }
      initialValues={props.initialValues}
      context={{ ...props.context, formName: props.formName }}
      onSubmit={props.onSubmit}
    >
      {({ schema, handleSubmit, theme, error, submitting, context }) => (
        <form onSubmit={handleSubmit}>
          {renderField(schema, null, theme || DefaultTheme, "", context)}
          <div>{error && <strong>{error}</strong>}</div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={submitting}
          >
            Submit
          </button>
        </form>
      )}
    </Form>
  );
};

const Liform = (props) => {
  props.schema.showLabel = false;
  const schema = compileSchema(props.schema);
  const formName = props.formKey || props.schema.title || "form";
  const FinalForm = props.baseForm || BaseForm;
  return (
    <FinalForm
      renderFields={renderField.bind(this)}
      formName={formName}
      {...props}
      schema={schema}
      onSubmit={props.onSubmit}
    />
  );
};

Liform.propTypes = {
  schema: PropTypes.object,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  syncValidation: PropTypes.func,
  formKey: PropTypes.string,
  baseForm: PropTypes.func,
  context: PropTypes.object,
  ajv: PropTypes.object,
};

export default Liform;

export {
  renderFields,
  renderField,
  processSubmitErrors,
  DefaultTheme,
  setError,
  buildSyncValidation,
  compileSchema,
};
