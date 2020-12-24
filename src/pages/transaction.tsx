import { useMutation } from "@apollo/client";
import { Layout } from "components/layout";
import { TRANSACTION } from "graphql/schema";
import React from "react";
import { Form, Formik, FormikProps } from "formik";
import { auth } from "utils/nhost";
import { useAuth } from "react-nhost";

export default function Transaction() {
  const [transaction] = useMutation(TRANSACTION);
  const { signedIn } = useAuth();
  const from_id = signedIn && auth.getClaim("x-hasura-user-id");
  return (
    <Layout>
      <div className="container flex flex-col max-w-xl max-auto shadow p-4 my-12 mx-auto">
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
                  to_account: Number(values.accountNumber),
                  increase: values.cost,
                  reduction: -values.cost,
                },
              });
              actions.resetForm();
            } catch (error) {
              actions.setSubmitting(false);
              console.log(error);
            }
            actions.setSubmitting(false);
          }}
        >
          {(props: FormikProps<any>) => (
            <Form className="flex flex-col">
              <input
                type="text"
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
                className="inline bg-indigo-700 text-white px-4 py-2 text-sm"
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

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const user_id = auth.isAuthenticated && auth.getClaim("x-hasura-user-id");

//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       user_id,
//     },
//   };
// }
