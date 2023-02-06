import { useParams } from 'umi';

export default () => {
  const params = useParams();
  return <>{params}</>;
};
