import { useMutation } from "@apollo/client";
import { Layout } from "components/layout";
import { TRANSACTION } from "graphql/schema";
import React from "react";
import { Form, Formik, FormikProps } from "formik";
import { auth } from "utils/nhost";
import { useAuth } from "react-nhost";
import Head from "next/head";
import { useToasts } from "react-toast-notifications";

export default function Transaction() {
  const [transaction] = useMutation(TRANSACTION);
  const { signedIn } = useAuth();
  const from_id = signedIn && auth.getClaim("x-hasura-user-id");
  const { addToast } = useToasts();
  return (
    <Layout>
      <div className="container flex flex-col max-w-xl max-auto shadow p-4 my-12 mx-auto">
        <Head>
          <title>Transaction</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="text-center uppercase text-gray-700 pb-4">
          Transaction
        </div>
        <Formik
          initialValues={{ accountNumber: "", cost: 0 }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            try {
              await transaction({
                variables: {
                  from_account: from_id,
                  to_account: parseInt(values.accountNumber, 10),
                  increase: values.cost,
                  reduction: -values.cost,
                },
              });
              addToast("Successfull!", {
                appearance: "success",
                autoDismiss: true,
              });
              actions.resetForm();
            } catch (error) {
              actions.setSubmitting(false);
              addToast(error.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
            actions.setSubmitting(false);
          }}
        >
          {(props: FormikProps<any>) => (
            <Form className="flex flex-col">
              <input
                type="text"
                autoFocus
                className="border rounded px-2 py-1 my-2"
                onChange={(e) => {
                  props.setFieldValue("accountNumber", e.target.value);
                }}
                value={props.values.accountNumber}
                name="Account number"
              />
              {props.errors.accountNumber && (
                <div id="feedback">{props.errors.accountNumber}</div>
              )}
              <input
                type="text"
                className="border rounded px-2 py-1 my-2"
                onChange={(e) => {
                  props.setFieldValue("cost", e.target.value);
                }}
                value={props.values.cost}
                name="Your cost"
              />
              {props.errors.cost && (
                <div id="feedback">{props.errors.cost}</div>
              )}
              <button
                type="submit"
                disabled={props.isSubmitting}
                onClick={() => {
                  console.log("click");
                }}
                className={`inline ${
                  props.isSubmitting ? "bg-purple-200" : "bg-indigo-700"
                } text-white px-4 py-2 text-sm`}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}
