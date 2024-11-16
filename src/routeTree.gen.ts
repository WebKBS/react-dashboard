/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as LoginIndexImport } from './routes/login/index'
import { Route as AboutIndexImport } from './routes/about/index'
import { Route as AuthenticatedDashboardIndexImport } from './routes/_authenticated/dashboard/index'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const LoginIndexRoute = LoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

const AboutIndexRoute = AboutIndexImport.update({
  id: '/about/',
  path: '/about/',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedDashboardIndexRoute =
  AuthenticatedDashboardIndexImport.update({
    id: '/dashboard/',
    path: '/dashboard/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/about/': {
      id: '/about/'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutIndexImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/dashboard/': {
      id: '/_authenticated/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthenticatedDashboardIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedDashboardIndexRoute: typeof AuthenticatedDashboardIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedDashboardIndexRoute: AuthenticatedDashboardIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '': typeof AuthenticatedRouteWithChildren
  '/about': typeof AboutIndexRoute
  '/login': typeof LoginIndexRoute
  '/dashboard': typeof AuthenticatedDashboardIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '': typeof AuthenticatedRouteWithChildren
  '/about': typeof AboutIndexRoute
  '/login': typeof LoginIndexRoute
  '/dashboard': typeof AuthenticatedDashboardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/about/': typeof AboutIndexRoute
  '/login/': typeof LoginIndexRoute
  '/_authenticated/dashboard/': typeof AuthenticatedDashboardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/about' | '/login' | '/dashboard'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/about' | '/login' | '/dashboard'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/about/'
    | '/login/'
    | '/_authenticated/dashboard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  AboutIndexRoute: typeof AboutIndexRoute
  LoginIndexRoute: typeof LoginIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  AboutIndexRoute: AboutIndexRoute,
  LoginIndexRoute: LoginIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/about/",
        "/login/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/dashboard/"
      ]
    },
    "/about/": {
      "filePath": "about/index.tsx"
    },
    "/login/": {
      "filePath": "login/index.tsx"
    },
    "/_authenticated/dashboard/": {
      "filePath": "_authenticated/dashboard/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
