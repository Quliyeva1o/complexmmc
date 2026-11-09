import type { Access, FieldAccess } from 'payload'

type Role = 'admin' | 'editor'
const hasRole = (user: unknown, role: Role) =>
  Boolean(user && (user as { roles?: Role[] }).roles?.includes(role))

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const isAdmin: Access = ({ req: { user } }) => hasRole(user, 'admin')

export const isAdminField: FieldAccess = ({ req: { user } }) => hasRole(user, 'admin')

export const anyone: Access = () => true

/** Public sees only published docs; logged-in editors see drafts too. */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
