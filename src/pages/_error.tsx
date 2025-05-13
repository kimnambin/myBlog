import {NextPageContext} from 'next';

interface statusCodeProps {
  statusCode: number;
}

const Error = ({statusCode}: statusCodeProps) => {
  return <p>{statusCode ? `Error {statusCode} !!!!!!!!!!` : 'Noooooooo'}</p>;
};

Error.getInitalProps = ({res, err}: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {statusCode};
};

export default Error;
