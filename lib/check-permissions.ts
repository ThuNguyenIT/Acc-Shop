import { NextApiRequest, NextApiResponse } from 'next';
import { createResponse } from './utils';

interface User {
  role: string;
  permissions: { [key: string]: boolean };
}

interface AuthenticatedNextApiRequest extends NextApiRequest {
  user?: User;
}

// Middleware function
export default function checkPermissions(
  allowedRoles: string[],
  requiredPermission: string
) {
  return async function (
    req: AuthenticatedNextApiRequest,
    res: NextApiResponse
  ) {
    const user = req.user;

    if (!user) {
        return createResponse('Unauthorized', null, 401);
    }

    const { role, permissions } = user;

    if (allowedRoles.includes(role)) {
      return;
    }

    if (permissions && permissions[requiredPermission]) {
      return;
    }

    return createResponse('Forbidden: You do not have permission', null, 403);
  };
}
