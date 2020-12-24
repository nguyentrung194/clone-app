import { gql } from "@apollo/client";

export const GET_USER_DATA = gql`
  query getUserData($user_id: uuid!) {
    user: users_by_pk(id: $user_id) {
      id
      display_name
    }
  }
`;

export const TRANSACTION = gql`
  mutation transaction(
    $from_account: uuid!
    $to_account: string!
    $reduction: Int!
    $increase: Int!
  ) {
    update_from: update_users_by_pk(
      pk_columns: { id: $from_account }
      _inc: { balance: $reduction }
    ) {
      balance
    }
    update_to: update_users(
      where: { account_number: { _eq: $to_account } }
      _inc: { balance: $increase }
    ) {
      returning {
        balance
      }
    }
  }
`;
