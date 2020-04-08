# Portal Builder Layout

Layout is a React component (v16) that will decide how widgets should be organized

## Widget structure
Each layout must have at least
```
│
└─── index.tsx      # contain the source code that will be used in Portal preview
│
└─── renderer.tsx   # contain the source code that will be used to deploy to Kintone
│
└─── type.d.ts      # contain TypeScript's type definition of layout
```

## Common rules for layout
1. Every properties of widget should be defined in `type.d.ts`, try not to use type `any`
2. A widget should have it's name defined in the `constant.ts` file.
3. A layout can access a full portal by using `PortalContext` exposed in the `PortalBuilder`
4. Do not use `PortalContext` in `renderer.tsx` to avoid conflict in build phase (**general webpack build** vs **electron build**)