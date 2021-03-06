import { GetServerSideProps } from 'next';
import { api } from '../../api/api';
import { UserPage } from '../../user/UserPage';

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const res = await api.get(`users/${id}`);
  return {
    props: { user: res.data, footer: true },
  };
};
