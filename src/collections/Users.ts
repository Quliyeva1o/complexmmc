import type { CollectionConfig } from 'payload'

import { authenticated, isAdmin, isAdminField } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'İstifadəçi', plural: 'İstifadəçilər' },
  auth: true,
  admin: { useAsTitle: 'email', group: 'Sistem', defaultColumns: ['name', 'email', 'roles'] },
  access: {
    read: authenticated,
    create: isAdmin,
    update: ({ req: { user }, id }) =>
      Boolean(user && ((user as { roles?: string[] }).roles?.includes('admin') || user.id === id)),
    delete: isAdmin,
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'name', label: 'Ad', type: 'text' },
    {
      name: 'roles',
      label: 'Rol',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      defaultValue: ['editor'],
      access: { update: isAdminField, create: isAdminField },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Redaktor', value: 'editor' },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      // The very first user becomes admin.
      async ({ req, operation, data }) => {
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({ collection: 'users', req })
          if (totalDocs === 0) data.roles = ['admin']
        }
        return data
      },
    ],
  },
}
