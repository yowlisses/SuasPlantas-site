import { requireLogin } from '../common/requireLogin';
import { UsersPage } from '../user/UsersPage';

export default UsersPage;

export const getServerSideProps = requireLogin;
